# This file defines the models for the database

## There are two models:
## playtraces: which action was taken at which level: (sessionID, experiment, level, action).
## trials: (sessionID, level, behavior, time, won).
from flask.globals import session
import psycopg2
from psycopg2.extras import execute_values
from itertools import repeat

class db_connection:
    def __init__(self, db_url, goal=10):
        self.connection = psycopg2.connect(db_url)
        self.goal = goal
    
    def execute_query(self, query):
        c = self.connection.cursor()
        c.execute(query)
        self.connection.commit()

    def create_playtraces_table(self, exp_name):
        query = f"CREATE TABLE IF NOT EXISTS playtraces_{exp_name}_goal_{self.goal} ("
        query += "id SERIAL PRIMARY KEY, "
        query += "session_id VARCHAR(36), " # uuid v4.
        query += "level text[][], " # Array of rows of text.
        query += "action text " # text.
        query += ") "
        try:
            self.execute_query(query)
        except psycopg2.errors.UniqueViolation:
            print("Table already exists?")
            pass

    def create_trials_table(self, exp_name):
        query = f"CREATE TABLE IF NOT EXISTS trials_{exp_name}_goal_{self.goal} ("
        query += "id SERIAL PRIMARY KEY, "
        query += "session_id VARCHAR(36), " # uuid v4.
        query += "level text[][], " # an array of rows of text.
        query += "behavior real[], " # an array of numbers.
        query += "time real, " # the amount of gameLoops.
        query += "won BOOLEAN " # whether the player won or lost.
        query += ") "
        try:
            self.execute_query(query)
        except psycopg2.errors.UniqueViolation:
            print("Table already exists?")
            pass
    
    def save_playtrace(self, session_id, exp_name, levels, actions):
        # Implement saving all the rows for the playtrace.
        # Look at this: 
        # https://stackoverflow.com/questions/8134602/psycopg2-insert-multiple-rows-with-one-query
        cursor = self.connection.cursor()
        all_tuples = list(zip(repeat(session_id), levels, actions))
        insert_query = f"INSERT INTO playtraces_{exp_name}_goal_{self.goal} (session_id, level, action) VALUES %s"
        execute_values(
            cursor, insert_query, all_tuples
        )
        # try:
        #     cursor.execute(f"INSERT INTO playtraces_{exp_name}_goal_{self.goal} VALUES " + args_str)
        # except Exception as e:
        #     print(f"Couldn't save playtrace: got error {e} ({type(e)})")

    def get_all_ids(self, exp_name):
        # Gets all (unique) session_ids from the trials table.
        query = f"SELECT DISTINCT session_id FROM trials_{exp_name}"
        c = self.connection.cursor()
        c.execute(query)
        ids = c.fetchall()
        return ids
    
    def save_trial(self, session_id, exp_name, level, behavior, time, won):
        # TODO: will I have to deal with how the array is structured?
        query = f"INSERT INTO trials_{exp_name}_goal_{self.goal} "
        query += f"(session_id, level, behavior, time, won) VALUES "
        query += f"('{session_id}', "
        query += f"ARRAY{level}, "
        query += f"ARRAY{behavior}, "
        query += f"{time}, "
        query += f"'{1 if won else 0}');"
        
        self.execute_query(query)
    
    def get_all_trials(self, exp_name, session_id=None, won=True):
        query = f"SELECT * FROM trials_{exp_name}_goal_{self.goal} "
        query += f" WHERE won={'TRUE' if won else 'FALSE'} "
        if session_id is not None:
            query += f" AND won=TRUE"

        c = self.connection.cursor()
        c.execute(query)
        trials = c.fetchall()
        trials_sorted = sorted(trials, key=lambda x: x[0])
        # print(trials)
        trials = [
            {"behavior": t[3], "time": t[4]} for t in trials_sorted
        ]

        return trials
    
    def get_all_playtraces(self, exp_name, session_id=None):
        query = f"SELECT * FROM playtraces_{exp_name}_goal_{self.goal} "
        if session_id is not None:
            query += f"WHERE session_id='{session_id}'"
        c = self.connection.cursor()
        c.execute(query)
        playtraces = c.fetchall()

        return playtraces
        

