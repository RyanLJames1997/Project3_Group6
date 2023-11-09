CREATE TABLE us_states(
	state_code  VARCHAR(10) PRIMARY KEY,
	state_name VARCHAR(50)
);

CREATE TABLE fast_food(
	state_code  VARCHAR(10),
    FOREIGN KEY (state_code) REFERENCES us_states(state_code),
	counts INTEGER
);

CREATE TABLE death_rates(
	entity VARCHAR(20),
	country_code VARCHAR(10),
	date_year  INTEGER,
	high_systolic_blood_pressure_count FLOAT,
 	diet_high_in_sodium_count FLOAT,
 	diet_low_in_whole_grains_count FLOAT,
 	alcohol_use_count FLOAT,
 	diet_low_in_fruits_count FLOAT,
 	unsafe_water_source_count FLOAT,
 	secondhand_smoke_count FLOAT,
 	low_birth_weight_count FLOAT,
 	child_wasting_count FLOAT,
 	unsafe_sex_count FLOAT,
 	diet_low_in_nuts_and_seeds_count FLOAT,
 	household_air_pollution_from_solid_fuels_count FLOAT,
 	diet_low_in_vegetables_count FLOAT,
 	smoking_count FLOAT,
 	high_fasting_plasma_glucose_count FLOAT,
 	air_pollution_count FLOAT,
 	high_body_mass_index_count FLOAT,
 	unsafe_sanitation_count FLOAT,
 	drug_use_count FLOAT,
 	low_bone_mineral_density_count FLOAT,
 	vitamin_a_deficiency_count FLOAT,
 	child_stunting_count FLOAT,
 	non_exclusive_breastfeeding_count FLOAT,
 	iron_deficiency_count FLOAT,
 	ambient_particulate_matter_pollution_count FLOAT,
 	low_physical_activity_count FLOAT,
 	no_access_to_handwashing_facility_count FLOAT,
 	high_ldl_cholesterol_count FLOAT
);

CREATE TABLE overweight_obesity(
    date_year INTEGER,
	state_code VARCHAR(10),
	FOREIGN KEY (state_code) REFERENCES us_states(state_code),
	response VARCHAR(30),
	break_out VARCHAR(30),
	break_out_category VARCHAR(30),
	sample_size INTEGER,
	data_value REAL,
	latitude DECIMAL(10,8),
	longitude DECIMAL(11,8)
);

CREATE TABLE gdp_state(
    state_name VARCHAR(50)
	FOREIGN KEY (state_name) REFERENCES us_states(state_name),
	description VARCHAR(30),
	2014_amount REAL,
	2015_amount REAL,
	2016_amount REAL,	
	2017_amount REAL,	
	2018_amount REAL,	
	2019_amount REAL
);
