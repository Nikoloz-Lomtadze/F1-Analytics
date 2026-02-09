## Connecting to database
import os
import sqlalchemy as al

DATABASE_URL = os.getenv("DATABASE_URL")
## this engine will be used throughout the project
engine = al.create_engine(DATABASE_URL)