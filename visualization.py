import os
from pathlib import Path
import matplotlib.pyplot as plt
import numpy as np
from zelda_experiment import ZeldaExperiment
from scipy.spatial import cKDTree
from sklearn.preprocessing import MinMaxScaler

from models import db_connection

try:
    from dotenv import load_dotenv

    load_dotenv()
except ModuleNotFoundError:
    print("Couldn't load the local .env file.")

DATABASE_URL = os.environ["DATABASE_URL"]
goal = int(os.environ["OPTIMIZATION_GOAL"])
prior_path = (
    Path(__file__).parent.resolve() / "static" / "data" / "custom_prior_seconds.json"
)
# prior_path = "./static/data/custom_prior.json"


def get_all_ids(exp_name):
    db = db_connection(DATABASE_URL)
    return db.get_all_ids(exp_name)


def plot_id(session_id):
    db = db_connection(DATABASE_URL)
    all_trials = db.get_all_trials(exp_name="bayesian", session_id=session_id)

    # assuming all_trials is sorted by time

    _, ax = plt.subplots(1, 1, figsize=(6, 6))
    ax.plot([t["time"] for t in all_trials])
    ax.set_title("Time to solve per level")
    ax.set_ylabel("Time [in-game steps]")
    ax.set_xlabel("Iteration")
    ax.axhline(y=goal, c="k")
    ax.axhline(y=goal - 1.5, c="b", linestyle="--")
    ax.axhline(y=goal + 1.5, c="b", linestyle="--")
    ax.set_title(session_id)
    ax.legend(loc=1)

    plt.show()


# TODO: implement this one.
def plot_evolution(session_id):
    db = db_connection(DATABASE_URL)
    all_trials = db.get_all_trials(exp_name="bayesian", session_id=session_id)

    behaviors = [t["behavior"] for t in all_trials]
    times = [t["time"] for t in all_trials]

    model_params = {
        "linear": True,
        "exp": False,
        "rbf": True,
        "noise": True,
        "acquisition": "ucb",
        "kappa": 0.05,
    }

    for i in range(len(times)):
        current_b = behaviors[: i + 1]
        current_t = times[: i + 1]

        ze = ZeldaExperiment(
            prior_path,
            goal,
            behaviors=current_b,
            times=current_t,
            projection=["leniency", "reachability"],
            model_parameters=model_params,
            verbose=False,
        )

        save_path = f"./{session_id}_iteration_{i}.jpg"
        save_path_3D = f"./plot_3D_with_sigma_{session_id}_iteration_{i}.jpg"

        ze.plot_projected(save_path)
        ze_3D = ZeldaExperiment(
            prior_path,
            goal,
            behaviors=current_b,
            times=current_t,
            projection=["leniency", "reachability"],
            model_parameters=model_params,
            verbose=False,
        )

        # ze_3D.view_3D_plot()
        ze_3D.save_3D_plot(save_path_3D, plot_sigma=True)
        plt.close("all")


def visualize_baseline(session_id):
    # print(experiment.keys())
    # print(experiment["iterations"][0].keys())

    ze = ZeldaExperiment(prior_path, goal, projection=["leniency", "reachability"])

    prior = ze.prior

    centroids = prior.loc[:, ["leniency", "reachability"]].values

    # scaler = MinMaxScaler()
    # scaled_cs = scaler.fit_transform(centroids)

    # Construct a KDTree with these centroids
    # kdtree = cKDTree(scaled_cs)

    # Add noise, and then query the point closest
    # and iterate.

    # plt.scatter(scaled_cs[:, 0], scaled_cs[:, 1])
    # plt.show()

    # Change this implementation to maintain the current one and draw arrows (?)
    # print(ze.prior)

    db = db_connection(DATABASE_URL)
    all_trials = db.get_all_trials(session_id)

    tested_cs = np.array([t["behavior"] for t in all_trials])
    times = [t["time"] for t in all_trials]
    for i, exp in enumerate(tested_cs):
        _, ax = plt.subplots(1, 1)
        ax.scatter(centroids[:, 0], centroids[:, 1])
        # color = "y" if (exp["became_new"] in [True, None]) else "k"
        # colors.append(color)
        ax.scatter(tested_cs[: i + 1, 0], tested_cs[: i + 1, 1], c="r", s=30)
        # ax.set_title(f"t = {performances}")
        plt.show()
        plt.close()


if __name__ == "__main__":
    # for exp_name in ["bayesian", "random", "baseline"]:
    #     print(exp_name)
    #     print(get_all_ids(exp_name))

    session_id = "1e63f4a0-ee21-47a9-a7cc-768d6ca12725"
    plot_id(session_id)
    plot_evolution(session_id)
    visualize_baseline(session_id)
