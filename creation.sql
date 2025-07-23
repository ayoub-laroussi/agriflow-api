CREATE EXTENSION IF NOT EXISTS pgcrypto; -- Pour générer des UUID

DROP TABLE IF EXISTS crop; 
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS soil_cover;
DROP TABLE IF EXISTS is_covered;
DROP TABLE IF EXISTS is_cultivated;
DROP TABLE IF EXISTS cultivation_spaces;
DROP TABLE IF EXISTS land;
DROP TABLE IF EXISTS users;

CREATE ROLE IF NOT EXISTS ${DB_USER} WITH LOGIN PASSWORD ${DB_PASSWORD};

CREATE TABLE crop(
   id_crop UUID,
   crop_commentary TEXT,
   crop_name VARCHAR(50)  NOT NULL,
   crop_plant_family VARCHAR(50) ,
   crop_variety VARCHAR(50) ,
   crop_planting_date DATE NOT NULL,
   crop_harvest_date DATE,
   crop_creation_date TIMESTAMP,
   crop_modification_date TIMESTAMP,
   crop_status TEXT,
   PRIMARY KEY(id_crop)
);

CREATE TABLE Role(
   id_role INTEGER,
   role_name VARCHAR(50) ,
   PRIMARY KEY(id_role)
);

CREATE TABLE soil_cover(
   id_soil_cover UUID,
   type_soil_cover VARCHAR(50) ,
   PRIMARY KEY(id_soil_cover)
);

CREATE TABLE users(
   id_user UUID,
   email VARCHAR(50)  NOT NULL,
   username VARCHAR(50)  NOT NULL,
   password HASH,
   users_creation_date TIMESTAMP NOT NULL NOM(),
   id_role INTEGER NOT NULL,
   PRIMARY KEY(id_user),
   UNIQUE(email),
   FOREIGN KEY(id_role) REFERENCES Role(id_role)
);

CREATE TABLE land(
   id_land UUID,
   land_name VARCHAR(50)  NOT NULL,
   land_area INTEGER NOT NULL,
   land_creation_date TIMESTAMP,
   land_modification_date TIMESTAMP,
   land_coordinate INTEGER,
   id_user UUID NOT NULL,
   PRIMARY KEY(id_land),
   FOREIGN KEY(id_user) REFERENCES users(id_user)
);

CREATE TABLE cultivation_spaces(
   id_cultivation_space UUID,
   cultivation_space_name VARCHAR(50)  NOT NULL,
   cultivation_space_type TEXT,
   cultivation_space_creation_date TIMESTAMP,
   cultivation_spaces_status TEXT,
   cultivation_spaces_area INTEGER,
   cultivation_spaces_length INTEGER,
   cultivation_spaces_soil_type VARCHAR(50) ,
   cultivation_spaces_width INTEGER,
   cultivation_spaces_ph INTEGER,
   cultivation_spaces_commentary TEXT,
   cultivation_space_modification_date TIMESTAMP,
   cultivation_spaces_soil_fertility VARCHAR(50) ,
   cultivation_spaces_soil_drainage VARCHAR(50) ,
   id_land UUID NOT NULL,
   PRIMARY KEY(id_cultivation_space),
   FOREIGN KEY(id_land) REFERENCES land(id_land)
);

CREATE TABLE is_cultivated(
   id_cultivation_space UUID,
   id_crop UUID,
   PRIMARY KEY(id_cultivation_space, id_crop),
   FOREIGN KEY(id_cultivation_space) REFERENCES cultivation_spaces(id_cultivation_space),
   FOREIGN KEY(id_crop) REFERENCES crop(id_crop)
);

CREATE TABLE is_covered(
   id_cultivation_space UUID,
   id_soil_cover UUID,
   cover_date_begin DATE,
   cover_date_end DATE,
   PRIMARY KEY(id_cultivation_space, id_soil_cover),
   FOREIGN KEY(id_cultivation_space) REFERENCES cultivation_spaces(id_cultivation_space),
   FOREIGN KEY(id_soil_cover) REFERENCES soil_cover(id_soil_cover)
);