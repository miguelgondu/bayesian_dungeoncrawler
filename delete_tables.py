import psycopg2

def print_all_tables(db):
    cursor = db.cursor()
    cursor.execute("""SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public'""")
    for table in cursor.fetchall():
        print(table)



db = psycopg2.connect("postgresql://localhost:5432/migd")
print("Before")
print_all_tables(db)

c = db.cursor()
c.execute("DROP TABLE IF EXISTS trials_bayesian, playtraces_bayesian, trials_random, playtraces_random, trials_baseline, playtraces_baseline;")
db.commit()

print("After")
print_all_tables(db)

