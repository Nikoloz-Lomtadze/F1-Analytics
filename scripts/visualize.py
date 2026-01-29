
import pandas as pd
import matplotlib.pyplot as plt
import sqlalchemy as al

engine = al.create_engine('postgresql://postgres:Pipetc77@localhost:5432/test3')
circuit_name = input("enter circuit name:")
# ------

# top 5 most wins by circuit
def most_wins_circuit(name,engine):
    query = """ select driver_ref,count(*) as wins from results r
                JOIN drivers d ON d.driver_id = r.driver_id
                JOIN races ra ON ra.race_id = r.race_id
                JOIN circuit c ON c.circuit_id = ra.circuit_id
                where position = '1' and c.circuit_name = %s 
                group by driver_ref
                order by wins desc 
                limit 5"""
    df = pd.read_sql_query(query,engine,params=[(name,)])
    plt.figure(figsize=(12,6))
    plt.bar(df['driver_ref'],df['wins'],color = 'red')
    plt.xlabel('Racers')
    plt.ylabel('Wins')
    plt.title(f'Top 5 Drivers Wins at {name}')
    plt.show()
# most_wins_circuit(circuit_name,engine)

# ------

# top 10 most wins
def most_wins(engine):
    query = """ select driver_ref,count(*) as wins from results
                join drivers on results.driver_id = drivers.driver_id
                where position = '1'
                group by driver_ref
                order by count(*) desc limit 10"""
    df = pd.read_sql_query(query,engine)
    plt.figure(figsize=(12,6))
    plt.bar(df['driver_ref'],df['wins'])
    plt.xlabel('Racers')
    plt.ylabel('Wins')
    plt.title('top 10 most wins in history 1950-2024')
    plt.show()
# most_wins(engine)

# ------

# top 5 fastest laps
def fastest_lap(name,engine,start = None,end = None):
    query1 = """ select driver_ref,min(lap_time) as min_time from lap_time r
                join drivers d on d.driver_id = r.driver_ID
                join races ra on r.race_id = ra.race_id
                join circuit c on ra.circuit_id = c.circuit_id
                where c.circuit_name = %s and race_date between %s and %s
                group by driver_ref
                order by min_time asc
                limit 5"""
    query = """select driver_ref,min(lap_time) as min_time from lap_time r
                join drivers d on d.driver_id = r.driver_ID
                join races ra on r.race_id = ra.race_id
                join circuit c on ra.circuit_id = c.circuit_id
                where c.circuit_name = %s
                group by driver_ref
                order by min_time asc
                limit 5"""
    if start and end:
        df = pd.read_sql_query(query1,engine,params=[(name,start,end)])
    else:
        df = pd.read_sql_query(query,engine,params=[(name,)])
    plt.figure(figsize=(12,6))
    plt.bar(df['driver_ref'],df['min_time'],color = 'red')
    plt.xlabel('Racers')
    plt.ylabel('Times')
    plt.title(f'Top 5 fastest_laps at {name}')
    plt.show()
# fastest_lap(circuit_name,engine,'2007-04-21','2022-12-1')
# ------
# top 5 fastest pit stops
def fastest_pit(name,engine,start = None,end = None):
    query1 = """select driver_ref,min(pit_time) as min_time from pit_stop p
                join drivers d on d.driver_id = p.driver_id
                join races r on r.race_id = p.race_id
                join circuit c on r.circuit_id = c.circuit_id
                where c.circuit_name = %s and race_date between %s and %s
                group by driver_ref
                order by min(pit_time) Asc
                limit 5"""
    query = """select driver_ref,min(pit_time) from pit_stop p
                join drivers d on d.driver_id = p.driver_id
                join races r on r.race_id = p.race_id
                join circuit c on r.circuit_id = c.circuit_id
                where c.circuit_name = %s
                group by driver_ref
                order by min(pit_time) Asc
                limit 5"""
    if start and end:
        df = pd.read_sql_query(query1,engine,params=[(name,start,end)])
    else:
        df = pd.read_sql_query(query,engine,params=[(name,)])
    plt.figure(figsize=(12,6))
    plt.bar(df['driver_ref'],df['min_time'],color = 'red')
    plt.xlabel('Racers')
    plt.ylabel('Times')
    plt.title(f'Top 5 fastest pit at {name}')
    plt.show()

# fastest_pit(circuit_name,engine,'2007-12-22','2024-02-22')

# ----------

# top 5 slowest pit stops
def slowest_pit(name,engine,start = None,end = None):
    query1 = """select driver_ref,max(pit_time) as max_time from pit_stop p
                join drivers d on d.driver_id = p.driver_id
                join races r on r.race_id = p.race_id
                join circuit c on r.circuit_id = c.circuit_id
                where c.circuit_name = %s and race_date between %s and %s
                group by driver_ref
                order by max_time desc
                limit 5"""
    query = """select driver_ref,max(pit_time) as max_time from pit_stop p
                join drivers d on d.driver_id = p.driver_id
                join races r on r.race_id = p.race_id
                join circuit c on r.circuit_id = c.circuit_id
                where c.circuit_name = %s 
                group by driver_ref
                order by max_time desc
                limit 5"""
    if start and end:
        df = pd.read_sql_query(query1,engine,params=[(name,start,end)])
    else:
        df = pd.read_sql_query(query,engine,params=[(name,)])
    plt.figure(figsize=(12,6))
    plt.bar(df['driver_ref'],df['max_time'],color = 'red')
    plt.xlabel('Racers')
    plt.ylabel('Times')
    plt.title(f'Top 5 Slowest pit at {name}')
    plt.show()

