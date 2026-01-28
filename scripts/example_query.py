
import pandas as pd
import psycopg2 as pg

# load csv
df = pd.read_csv(r"Desktop\F1-Analytics\csv\constructor_results.csv")
print(df.columns)

# Rename columns to match PostgreSQL table
df = df.rename(columns={
    'constructorResultsId': 'constructor_result_id',
    'raceId': 'race_id',
    'constructorId': 'constructor_id'
})
print(df.columns)
print(df.info())

# replace nan with none
df = df.where(pd.notnull(df), None)

# connect to PostgreSQL
conn = pg.connect(
    dbname='test3',
    user='postgres',
    password='Pipetc77'
)
curr = conn.cursor()

#inserting rows into 
for _, row in df.iterrows():
    curr.execute(
        """
        INSERT INTO constructor_results(
            constructor_result_id,
            race_id,
            constructor_id,
            points,
            status
        )
        VALUES (%s, %s, %s, %s, %s)
        ON CONFLICT (constructor_result_id) DO NOTHING
        """,
        tuple(row)
    )

#commit and lose
conn.commit()
curr.close()
conn.close()