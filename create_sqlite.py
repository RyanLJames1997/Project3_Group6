import sqlite3
import pandas as pd

from pathlib import Path

# CREATE the SQLite Database
database_path = "./database/project3_group6.sqlite"
Path(database_path).touch()

# CONNECT to DB
conn = sqlite3.connect(database_path)
c = conn.cursor()

# CREATE TABLE us_states
c.execute('''CREATE TABLE us_states ( state_code text, state_name text, PRIMARY KEY (state_code))''')

# READ CSV and write to SQLite database
csv_us_states_pd = pd.read_csv("./clean_data/us_states.csv")
csv_us_states_pd.to_sql("us_states", conn, if_exists='append', index=False)
conn.commit()


# CREATE TABLE fast_food
# Apparently, SQLAlchemy ORM NEEDS a primary key in order to map
c.execute('''CREATE TABLE fast_food ( ID INTEGER PRIMARY KEY AUTOINCREMENT, state_code text, counts int, FOREIGN KEY (state_code) REFERENCES us_states(state_code))''')

# READ CSV and write to SQLite database
csv_fast_food_pd = pd.read_csv("./clean_data/Fast_Food_Restaurants_US_cleaned.csv")
csv_fast_food_pd['ID'] = None
csv_fast_food_pd.to_sql("fast_food", conn, if_exists='append', index=False)
conn.commit()


# CREATE TABLE death_rates
# Apparently, SQLAlchemy ORM NEEDS a primary key in order to map
c.execute('''CREATE TABLE death_rates ( ID INTEGER PRIMARY KEY AUTOINCREMENT, entity text, country_code text, date_year int, ''' \
          '''high_systolic_blood_pressure_count float(9, 2), diet_high_in_sodium_count float(9, 2), diet_low_in_whole_grains_count  float(9, 2),''' \
          '''alcohol_use_count float(9, 2), diet_low_in_fruits_count float(9, 2), unsafe_water_source_count  float(9, 2),''' \
          '''secondhand_smoke_count float(9, 2), low_birth_weight_count float(9, 2), child_wasting_count  float(9, 2),''' \
          '''unsafe_sex_count float(9, 2), diet_low_in_nuts_and_seeds_count float(9, 2), household_air_pollution_from_solid_fuels_count  float(9, 2),''' \
          '''diet_low_in_vegetables_count float(9, 2), smoking_count float(9, 2), high_fasting_plasma_glucose_count  float(9, 2),''' \
          '''air_pollution_count float(9, 2), high_body_mass_index_count float(9, 2), unsafe_sanitation_count  float(9, 2),''' \
          '''drug_use_count float(9, 2), low_bone_mineral_density_count float(9, 2), vitamin_a_deficiency_count  float(9, 2),''' \
          '''child_stunting_count float(9, 2), non_exclusive_breastfeeding_count float(9, 2), iron_deficiency_count  float(9, 2),''' \
          '''ambient_particulate_matter_pollution_count float(9, 2), low_physical_activity_count float(9, 2), no_access_to_handwashing_facility_count  float(9, 2),''' \
          '''high_ldl_cholesterol_count float(9, 2))''')

# READ CSV and write to SQLite database
csv_death_rates_pd = pd.read_csv("./clean_data/Death_rate_table.csv")
csv_death_rates_pd['ID'] = None
csv_death_rates_pd.to_sql("death_rates", conn, if_exists='append', index=False)
conn.commit()


# CREATE TABLE overweight_obesity
# Apparently, SQLAlchemy ORM NEEDS a primary key in order to map
c.execute('''CREATE TABLE overweight_obesity ( ID INTEGER PRIMARY KEY AUTOINCREMENT, date_year int, state_code text, response text, ''' \
          '''break_out text, break_out_category text, sample_size int, data_value float(9, 2), latitude float(9, 2), longitude float(9, 2),''' \
          '''FOREIGN KEY (state_code) REFERENCES us_states(state_code))''')

# READ CSV and write to SQLite database
csv_overweight_obesity_pd = pd.read_csv("./clean_data/BRFSS__Table_of_Overweight_and_Obesity__BMI__20231102_cleaned.csv")
csv_overweight_obesity_pd['ID'] = None
csv_overweight_obesity_pd.to_sql("overweight_obesity", conn, if_exists='append', index=False)
conn.commit()


# CREATE TABLE gdp_state
# Apparently, SQLAlchemy ORM NEEDS a primary key in order to map
c.execute('''CREATE TABLE gdp_state ( ID INTEGER PRIMARY KEY AUTOINCREMENT, state_name text, description text, ''' \
          '''amount_2014 float(9, 2), amount_2015 float(9, 2), amount_2016 float(9, 2), amount_2017 float(9, 2), amount_2018 float(9, 2), amount_2019 float(9, 2),''' \
          '''FOREIGN KEY (state_name) REFERENCES us_states(state_name))''')

# READ CSV and write to SQLite database
csv_gdp_state_pd = pd.read_csv("./clean_data/GDP_data.csv")
csv_gdp_state_pd['ID'] = None
csv_gdp_state_pd.to_sql("gdp_state", conn, if_exists='append', index=False)
conn.commit()


# FINALLY Close connection
conn.close()
