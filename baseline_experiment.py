"""
This script implements a baseline experiment
in which we present the user with levels noisly
selected from the prior.
"""
import numpy as np
from scipy.spatial import cKDTree
from sklearn.preprocessing import MinMaxScaler

from utils.pcg import level_from_text

from zelda_experiment import ZeldaExperiment

class BaselineExperiment:
    def __init__(self, path, goal, behaviors=[], times=[], projection=None, verbose=True, model_parameters={}):
        self.goal = goal
        ze = ZeldaExperiment(
            path,
            goal,
            projection=["leniency", "reachability"],
            model_parameters=model_parameters,
            verbose=verbose
        )
        self.prior = ze.prior

        self.behaviors = behaviors
        self.times = times
        self.centroids = self.prior.loc[:, ["leniency", "reachability"]].values

        self.scaler = MinMaxScaler()
        self.scaled_cs = self.scaler.fit_transform(self.centroids)

        # Construct a KDTree with these centroids
        self.kdtree = cKDTree(self.scaled_cs)
        # Add noise, and then query the point closest
        # and iterate.

    def next_level(self):
        # Queries for the next level
        # by running noisy hill-climing.
        if len(self.behaviors) > 0:
            times_sorted = sorted([(i, t) for i, t in enumerate(self.times)], key=lambda x: np.abs(x[1] - self.goal), reverse=True)
            current_beh = self.behaviors[times_sorted[-1][0]]
            print(f"Best level so far: {current_beh}.")
            print(f"it's time: {times_sorted[-1][1]}")
            scaled_c = self.scaler.transform([current_beh])
            scaled_c = scaled_c[0]
            new_point = scaled_c + np.random.normal(scale=0.1, size=scaled_c.size)
        else:
            new_point = np.array([0.5] * len(self.centroids[0]))

        # Compute new point

        # Convert it to the closest one in the grid
        index = self.kdtree.query(new_point)[1]
        new_point = self.centroids[index]
        print(f"Testing level at {new_point}")

        x_new = level_from_text(self.prior.loc[index, "level"])
        return x_new







