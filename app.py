import json
import os
from flask_cors import CORS
from flask import Flask, render_template, jsonify, request, session

from zelda_experiment import ZeldaExperiment
from random_experiment import RandomExperiment
from baseline_experiment import BaselineExperiment

from models import db_connection
from utils.map_elites import compute_features

try:
    from dotenv import load_dotenv
    load_dotenv()
except ModuleNotFoundError:
    print("Couldn't load the local .env file.")

def clean_level(level):
    clean = []
    for row in level:
        clean_row = ["1" if s in ["2", "3"] else s for s in row]
        clean.append(clean_row)
    
    return clean

# Setting up the DB connection

# Creating tables
goal = int(os.environ["OPTIMIZATION_GOAL"])
db = db_connection(os.environ["DATABASE_URL"], goal=goal)
for exp_name in ["bayesian", "random", "baseline"]:
    db.create_playtraces_table(exp_name)
    db.create_trials_table(exp_name)

app = Flask(__name__)
app.secret_key = os.environ["SECRET_KEY"]
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/instructions")
def instructions():
    return render_template("instructions.html")

@app.route("/game")
def game():
    return render_template("game.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/end")
def end():
    return render_template("end.html")

@app.route("/level", methods=["GET", "POST"])
def level():
    # goal = 10 # replaced by an os environ.
    prior_path = "./static/data/custom_prior_seconds.json"

    print("Request: ")
    print(request.get_json())
    data = request.get_json()
    session_id = data["session_id"]
    experiment = data["experiment"]

    all_trials = db.get_all_trials(experiment, session_id=session_id)
    behaviors = [t["behavior"] for t in all_trials]
    times = [t["time"] for t in all_trials]
    print(f"Fitting with")
    print(f"Beh: {behaviors}")
    print(f"T: {times}")

    # Using the default model parameters:
    # model_params = {
    #     "linear": True,
    #     "exp": False,
    #     "rbf": True,
    #     "noise": True,
    #     "acquisition": "ucb",
    #     "kappa": 0.05
    # }

    if experiment == "random":
        exp = RandomExperiment(prior_path)
        next_level = exp.next_level()
    elif experiment == "baseline":
        exp = BaselineExperiment(
            prior_path,
            goal,
            behaviors=behaviors,
            times=times,
            projection=["leniency", "reachability"],
            model_parameters=None
        )
        next_level = exp.next_level()
    else:
        exp = ZeldaExperiment(
            prior_path,
            goal,
            behaviors=behaviors,
            times=times,
            projection=["leniency", "reachability"],
            model_parameters=None
        )
        print(f"Running bayesian with goal {goal}")
        next_level = exp.next_level()
        print("Defaulting to Bayesian")

    behaviors = compute_features(next_level)
    next_behavior = [
        behaviors["leniency"],
        behaviors["reachability"]
    ]
    next_level = clean_level(next_level)
    print(f"Next level: {next_level}")
    print(f"Beh: {next_behavior}")

    document = {
        "next_level": next_level,
        "behavior": next_behavior
    }
    return jsonify(document)

@app.route("/trials", methods=["POST"])
def save_trials():
    try:
        data = request.get_json()
        print("Saving trial: ")
        print(data)
        db.save_trial(
            data["session_id"],
            data["exp_name"],
            data["level"],
            data["behavior"],
            data["time"],
            data["won"]
        )
    except Exception as e:
        print(f"Couldn't save data: {type(e)}: {e}")
    finally:
        return jsonify({})

@app.route("/playtraces", methods=["POST"])
def save_playtraces():
    # try:
    data = request.get_json()
    print(f"Received a playtrace: {data}")
    db.save_playtrace(
        data["session_id"],
        data["experiment"],
        data["levels"],
        data["actions"]
    )
    return jsonify({})
    # except Exception as e:
    #     print(f"Couldn't save data: {type(e)}: {e}")
    

if __name__ == "__main__":
    print("Serving the web app")
    app.run(debug=True)
