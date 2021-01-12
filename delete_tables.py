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

DATABASE_URL = os.environ["DATABASE_URL"]
db = psycopg2.connect(DATABASE_URL)
print("Before")
all_tables = print_all_tables(db)

for table, in all_tables:
    print(f"Dropping {table}. Click to continue.")
    input()
    c = db.cursor()
    c.execute(f"DROP TABLE IF EXISTS {table};")
    db.commit()

print("After")
print_all_tables(db)

