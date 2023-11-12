import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

database_path = "./database/project3_group6.sqlite"
engine = create_engine("sqlite:///./database/project3_group6.sqlite")

# Reflect Database into ORM class
Base = automap_base()

Base.prepare(engine, reflect = True)

print(Base.classes.keys())

gdp_state = Base.classes.gdp_state
print(gdp_state)

for column in gdp_state.__table__.columns:
    print(column)

# Create a session
session = Session(bind=engine)

# Display the row's columns and data in dictionary format
first_row = session.query(gdp_state).first()
print(first_row.__dict__) #contains the values of a query objects attributes.

