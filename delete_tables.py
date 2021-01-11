import psycopg2

def print_all_tables(db):
    cursor = db.cursor()
    cursor.execute("""SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public'""")
    return cursor.fetchall()

db = psycopg2.connect("postgresql://localhost:5432/migd")
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

