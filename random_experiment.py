from utils.pcg import level_from_text
from zelda_experiment import ZeldaExperiment

class RandomExperiment:
    def __init__(self, path):
        goal = 10 # This isn't used, really.
        self.goal = goal
        model_params = {
            "linear": True,
            "exp": False,
            "rbf": True,
            "noise": True,
            "acquisition": "ucb",
            "kappa": 0.05
        } # This shouldn't need to be here. TODO: fix that bug.
        ze = ZeldaExperiment(
            path,
            1,
            projection=["leniency", "reachability"],
            model_parameters=model_params,
            verbose=False
        )
        self.levels = ze.prior["level"]
    
    def next_level(self):
        x_new = level_from_text(self.levels.sample().values[0])
        return x_new
