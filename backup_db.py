import json

from models import db_connection
from visualization import DATABASE_URL

db = db_connection(DATABASE_URL)

for exp_name in ["bayesian", "random", "baseline"]:
    # making a table of these ones.
    query = f"SELECT * FROM trials_{exp_name};"
    c = db.connection.cursor()
    c.execute(query)
    all_trials = c.fetchall()
    rows = [{
        "db_id": t[0],
        "session_id": t[1],
        "level": t[2],
        "behavior": t[3],
        "time": t[4],
        "won": t[5],
    } for t in all_trials]

    print(rows)
    with open(f"./{exp_name}.json", "w") as fp:
        json.dump(rows, fp)
