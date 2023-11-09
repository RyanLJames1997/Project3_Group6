CREATE TABLE us_states(
	state_code  VARCHAR(10) PRIMARY KEY,
	state_name VARCHAR(50)
);

CREATE TABLE fast_food(
	state_code  VARCHAR(10),
    FOREIGN KEY (state_code) REFERENCES us_states(state_code),
	count INTEGER
);

CREATE TABLE death_rates(
	country_code VARCHAR(10),
	date_year  INTEGER,
	high_blood_count INTEGER,
	high_sodium_count INTEGER,
	low_whole_grains_count INTEGER,
	alcohol_use_count INTEGER,
	low_in_fruits_count INTEGER,
	unsafe_water_source_count INTEGER,
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

