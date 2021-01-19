import psycopg2
import os
try:
    from dotenv import load_dotenv
    load_dotenv()
except ModuleNotFoundError:
    print("Couldn't load the local .env file.")

def print_all_tables(db):
    cursor = db.cursor()
    cursor.execute("""SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public'""")
    return cursor.fetchall()

# DATABASE_URL_1 = os.environ["DATABASE_URL"]
# DATABASE_URL_2 = os.environ["HEROKU_POSTGRESQL_OLIVE_URL"]
# db1 = psycopg2.connect(DATABASE_URL_1)
# db2 = psycopg2.connect(DATABASE_URL_2)
# # print("Before")
# for url, db in zip([DATABASE_URL_1, DATABASE_URL_2], [db1, db2]):
#     print(f"PROCESSING TABLES IN {url}")
#     all_tables = print_all_tables(db)
#     for table, in all_tables:
#         if "bayesian" in table and "playtraces" not in table:
#             print(f"Dropping {table}. Click to continue.")
#             input()
#             c = db.cursor()
#             c.execute(f"DROP TABLE IF EXISTS {table};")
#             db.commit()

#     print("After")
#     print(print_all_tables(db))

