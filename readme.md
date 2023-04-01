# Bayesian Dungeon Crawler

This web app was used in the second experiment of the paper [*Fast Game Content Adaptation Through Bayesian-based Player Modelling*](https://arxiv.org/abs/2105.08484), which was presented at CoG2021.

This web app tests three systems for dynamic difficulty adjustment:
- Serving levels completely at random (see `random_experiment.py`).
- Serving levels with noisy hill-climbing (see `baseline_experiment.py`), and
- Serving levels using Bayesian Optimization with a Gaussian Process model and UCB as an acquisition function (see `zelda_experiment.py`).

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

### Running it.

After installing these requirements, you can run the app:

```
python app.py
```

## The game.

The logic of the game itself is in the `frontend` folder. This is an angular app that is then compiled into the `static` folder. Standing in `frontend`:

```
ng build --prod --build-optimizer --baseHref="/static/"
```

and then copy the contents of `dist` to `static`, and update `./templates/game.html`'s `main` script to the new hash. Sorry.

