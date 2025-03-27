CREATE EXTENSION IF NOT EXISTS pgcrypto; -- Pour générer des UUID

DROP TABLE IF EXISTS crop; 
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS soil_cover;
DROP TABLE IF EXISTS is_covered;
DROP TABLE IF EXISTS is_cultivated;
DROP TABLE IF EXISTS cultivation_spaces;
DROP TABLE IF EXISTS land;
DROP TABLE IF EXISTS users;

DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'admin-agriflow') THEN
      CREATE ROLE "admin-agriflow" WITH LOGIN PASSWORD 'admin-agriflow1234';
   END IF;
END
$do$;

CREATE TABLE crop (
   id_crop UUID DEFAULT gen_random_uuid() PRIMARY KEY,
   crop_commentary TEXT,
   crop_name VARCHAR(50) NOT NULL,
   crop_plant_family VARCHAR(50),
   crop_variety VARCHAR(50),
   crop_planting_date DATE NOT NULL,
   crop_harvest_date DATE,
   crop_creation_date TIMESTAMP DEFAULT NOW(),
   crop_modification_date TIMESTAMP DEFAULT NOW(),
   crop_status TEXT
);

CREATE TABLE roles (
   role TEXT PRIMARY KEY
);

CREATE TABLE soil_cover (
   id_soil_cover UUID DEFAULT gen_random_uuid() PRIMARY KEY,
   type_soil_cover VARCHAR(50)
);

CREATE TABLE users (
   id_user UUID DEFAULT gen_random_uuid() PRIMARY KEY,
   email VARCHAR(50) NOT NULL UNIQUE,
   username VARCHAR(50) NOT NULL,
   password TEXT NOT NULL,
   users_creation_date TIMESTAMP DEFAULT NOW(),
   role TEXT NOT NULL REFERENCES roles(role) ON DELETE CASCADE
);

CREATE TABLE land (
   id_land UUID DEFAULT gen_random_uuid() PRIMARY KEY,
   land_name VARCHAR(50) NOT NULL,
   land_area INTEGER NOT NULL CHECK (land_area > 0),
   land_creation_date TIMESTAMP DEFAULT NOW(),
   land_modification_date TIMESTAMP DEFAULT NOW(),
   land_coordinate INTEGER,
   id_user UUID NOT NULL REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE cultivation_spaces (
   id_cultivation_space UUID DEFAULT gen_random_uuid() PRIMARY KEY,
   cultivation_space_name VARCHAR(50) NOT NULL,
   cultivation_space_type TEXT,
   cultivation_space_creation_date TIMESTAMP DEFAULT NOW(),
   cultivation_space_modification_date TIMESTAMP DEFAULT NOW(),
   cultivation_spaces_status TEXT,
   cultivation_spaces_area INTEGER CHECK (cultivation_spaces_area >= 0),
   cultivation_spaces_length INTEGER CHECK (cultivation_spaces_length >= 0),
   cultivation_spaces_soil_type VARCHAR(50),
   cultivation_spaces_width INTEGER CHECK (cultivation_spaces_width >= 0),
   cultivation_spaces_ph INTEGER CHECK (cultivation_spaces_ph BETWEEN 0 AND 14),
   cultivation_spaces_commentary TEXT,
   cultivation_spaces_soil_fertility VARCHAR(50),
   cultivation_spaces_soil_drainage VARCHAR(50),
   id_land UUID NOT NULL REFERENCES land(id_land) ON DELETE CASCADE
);

CREATE TABLE is_cultivated (
   id_cultivation_space UUID NOT NULL REFERENCES cultivation_spaces(id_cultivation_space) ON DELETE CASCADE,
   id_crop UUID NOT NULL REFERENCES crop(id_crop) ON DELETE CASCADE,
   PRIMARY KEY(id_cultivation_space, id_crop)
);

CREATE TABLE is_covered (
   id_cultivation_space UUID NOT NULL REFERENCES cultivation_spaces(id_cultivation_space) ON DELETE CASCADE,
   id_soil_cover UUID NOT NULL REFERENCES soil_cover(id_soil_cover) ON DELETE CASCADE,
   cover_date_begin DATE NOT NULL,
   cover_date_end DATE,
   PRIMARY KEY(id_cultivation_space, id_soil_cover)
);
