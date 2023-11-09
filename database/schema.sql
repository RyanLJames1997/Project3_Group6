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
	country_code VARCHAR(10),
	date_year  INTEGER,
	high_systolic_blood_pressure_count INTEGER,
 	diet_high_in_sodium_count INTEGER,
 	data_valueiet_low_in_whole_grains_count INTEGER,
 	alcohol_use_count INTEGER,
 	diet_low_in_fruits_count INTEGER,
 	unsafe_water_source_count INTEGER,
 	secondhand_smoke-count INTEGER,
 	low_birth_weight_count INTEGER,
 	child_wasting_count INTEGER,
 	unsafe_sex_count INTEGER,
 	diet_low_in_nuts_and_seeds_count INTEGER,
 	household_air_pollution_from_solid_fuels_count INTEGER,
 	diet_low_in_vegetables_count INTEGER,
 	smoking_count INTEGER,
 	high_fasting_plasma_glucose_count INTEGER,
 	air_pollution_count INTEGER,
 	high_body_mass_index_count INTEGER,
 	unsafe_sanitation_count INTEGER,
 	drug_use_count INTEGER,
 	low_bone_mineral_density-count INTEGER,
 	vitamin_a_deficiency_count INTEGER,
 	child_stunting_count INTEGER,
 	non_exclusive_breastfeeding_count INTEGER,
 	iron_deficiency_count INTEGER,
 	ambient_particulate_matter_pollution_count INTEGER,
 	low_physical_activity_count INTEGER,
 	no_access_to_handwashing_facility_count INTEGER,
 	high_ldl_cholesterol_count INTEGER,
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

