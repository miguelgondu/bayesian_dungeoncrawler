# Roguelike web app

This web app tests three systems for dynamic difficulty adjustment:
- Serving levels completely at random (see `random_experiment.py`).
- Serving levels with noisy hill-climbing (see `baseline_experiment.py`), and
- Serving levels using Bayesian Optimization with a Gaussian Process model and UCB as an acquisition function (see `zelda_experiment.py`).

If you want to know more about our research, [read our paper](https://arxiv.org/abs/2005.07677) (which tests the Bayesian Optimization approach on planning agents).

## Running this webapp

### Setting up a `.env` file

To run this webapp, you will **need to have postgres installed** and you will need to write a `.env` file in this directory. An example of such `.env` file would be:

```
DATABASE_URL = "postgresql://your-db-address"
SECRET_KEY = "somethingsomethingsomething"
OPTIMIZATION_GOAL = 10
```

The `OPTIMIZATION_GOAL` is in seconds, and is the target that both the hill-climbing algorithm and the B.O. are trying to get to. For example, if `OPTIMIZATION_GOAL = 10`, then both systems will try to present the player a level that takes 10 seconds to solve.

Since the actual app is using Heroku's database, you will need to change `db_name` in `app.py` to be `DATABASE`.

### Python dependencies

This project was built in Python 3.7. Install all Python dependencies by running

```
pip install -r requirements.txt
```


