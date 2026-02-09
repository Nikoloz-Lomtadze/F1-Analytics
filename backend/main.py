# working with api for project to connect to frontend
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from backend.db import engine
from backend.analytics.visualize import most_wins,most_wins_circuit,fastest_lap,fastest_pit,slowest_pit
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")





app = FastAPI(title='most wins by circuit')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow another port
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/')
def root():
    return {'api is running'}

# using api to get most wins in general
@app.get("/most-wins")
def most_won():
    df = most_wins(engine)
    return df.to_dict(orient="records")

# using api to get most wins per circuit
@app.get(f"/wins-by-circuit")
def wins_circuit(name: str):
    df = most_wins_circuit(engine,name)
    return df.to_dict(orient = "records")

# using api to get fastest lap per circuit,start year and end is optional
@app.get("/fastest-lap")
def get_fastest_lap(name: str, start: Optional[str] = None, end: Optional[str] = None):
    df = fastest_lap(engine, name, start, end)
    return df.to_dict(orient="records")

# using api to get fastest pit times per circuit,start year and end is optional
@app.get("/fastest-pit")
def get_fastest_pit(name: str,start: Optional[str]=None,end: Optional[str]=None):
    df = fastest_pit(engine,name,start,end)
    return df.to_dict(orient= "records")

# using api to get slowest pit times per circuit,start year and end is optional
@app.get("/slowest-pit") 
def get_slowest_pit(name: str,start: Optional[str] = None,end: Optional[str]= None):
    df = slowest_pit(engine,name,start,end)
    return df.to_dict(orient="records")