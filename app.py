# Import the dependencies.
from flask import Flask, render_template, jsonify

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pandas as pd

# Create an app, being sure to pass __name__
app = Flask(__name__, template_folder="templates")

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///./database/project3_group6.sqlite")

# Reflect Database into ORM class
Base = automap_base()

Base.prepare(engine, reflect = True)

print(Base.classes.keys())

Overweight_obesity = Base.classes.overweight_obesity
#print(gdp_state)

# for column in gdp_state.__table__.columns:
#     print(column)

# # Create a session
# session = Session(bind=engine)

# # Display the row's columns and data in dictionary format
# first_row = session.query(gdp_state).first()
# print(first_row.__dict__) #contains the values of a query objects attributes.



# MAIN route
@app.route("/")
def home():

    #session = Session(engine)

    #recent_dataset = session.query(Overweight_obesity.date_year, Overweight_obesity.state_code, Overweight_obesity.response, Overweight_obesity.data_value).all()
    overweight_obesity_df = pd.read_sql_table('overweight_obesity', engine)
    overweight_obesity_json = overweight_obesity_df.to_dict(orient="records")
    #print(overweight_obesity_json)

    return render_template('index.html', data=overweight_obesity_json) 


@app.route("/obesity_gdp")
def obesity_gdp():
    return render_template('obesity_gdp.html')


@app.route("/death_rates")
def death_rates():
    return render_template('death_rates.html')



if __name__ == "__main__":
    app.run(debug=True)
