
DROP DATABASE IF EXISTS pairings_db;
CREATE DATABASE pairings_db;

USE pairings_db;

CREATE TABLE pairs
(
	pair_id int NOT NULL AUTO_INCREMENT,
	media_type varchar(255) NOT NULL,
	media_title varchar(255) NOT NULL,
	food_name varchar(255),
	recipe_url varchar(255),
	playlist_url varchar(255),
	drink_name varchar(255),
	drink_url varchar(255),
	user_id int,
	PRIMARY KEY (pair_id)
); 