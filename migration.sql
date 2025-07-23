-- Migration initiale pour AgriFlow

-- Création des extensions PostgreSQL nécessaires
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Création de la table Role
CREATE TABLE IF NOT EXISTS "Role" (
    "id_role" integer NOT NULL,
    "role_name" character varying(50),
    PRIMARY KEY ("id_role")
);

-- Création de la table users
CREATE TABLE IF NOT EXISTS "users" (
    "id_user" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "email" character varying(50) NOT NULL,
    "username" character varying(50) NOT NULL,
    "password" character varying(255) NOT NULL,
    "users_creation_date" TIMESTAMP NOT NULL DEFAULT now(),
    "id_role" integer NOT NULL,
    PRIMARY KEY ("id_user"),
    CONSTRAINT "UQ_users_email" UNIQUE ("email"),
    CONSTRAINT "FK_users_role" FOREIGN KEY ("id_role") REFERENCES "Role"("id_role")
);

-- Création de la table land
CREATE TABLE IF NOT EXISTS "land" (
    "id_land" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "land_name" character varying(50) NOT NULL,
    "land_area" integer NOT NULL,
    "land_creation_date" TIMESTAMP DEFAULT now(),
    "land_modification_date" TIMESTAMP DEFAULT now(),
    "land_coordinate" integer,
    "id_user" uuid NOT NULL,
    PRIMARY KEY ("id_land"),
    CONSTRAINT "FK_land_users" FOREIGN KEY ("id_user") REFERENCES "users"("id_user")
);

-- Création de la table cultivation_spaces
CREATE TABLE IF NOT EXISTS "cultivation_spaces" (
    "id_cultivation_space" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "cultivation_space_name" character varying(50) NOT NULL,
    "cultivation_space_type" text,
    "cultivation_space_creation_date" TIMESTAMP DEFAULT now(),
    "cultivation_spaces_status" text,
    "cultivation_spaces_area" integer,
    "cultivation_spaces_length" integer,
    "cultivation_spaces_soil_type" character varying(50),
    "cultivation_spaces_width" integer,
    "cultivation_spaces_ph" integer,
    "cultivation_spaces_commentary" text,
    "cultivation_space_modification_date" TIMESTAMP DEFAULT now(),
    "cultivation_spaces_soil_fertility" character varying(50),
    "cultivation_spaces_soil_drainage" character varying(50),
    "id_land" uuid NOT NULL,
    PRIMARY KEY ("id_cultivation_space"),
    CONSTRAINT "FK_cultivation_spaces_land" FOREIGN KEY ("id_land") REFERENCES "land"("id_land")
);

-- Création de la table observations
CREATE TABLE IF NOT EXISTS "observations" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "observation_date" TIMESTAMP NOT NULL,
    "description" text,
    "temperature" decimal(4,1),
    "humidity" decimal(5,2),
    "precipitation" decimal(5,2),
    "wind_speed" decimal(5,2),
    "wind_direction" varchar(2),
    "pressure" decimal(6,2),
    "weather_condition" varchar(50),
    "cultivation_space_id" uuid,
    "land_id" uuid,
    "is_land_observation" boolean DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY ("id"),
    CONSTRAINT "FK_observations_cultivation_spaces" FOREIGN KEY ("cultivation_space_id") REFERENCES "cultivation_spaces"("id_cultivation_space"),
    CONSTRAINT "FK_observations_land" FOREIGN KEY ("land_id") REFERENCES "land"("id_land")
);

-- Création de la table crop
CREATE TABLE IF NOT EXISTS "crop" (
    "id_crop" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "crop_commentary" text,
    "crop_name" character varying(50) NOT NULL,
    "crop_plant_family" character varying(50),
    "crop_variety" character varying(50),
    "crop_planting_date" date NOT NULL,
    "crop_harvest_date" date,
    "crop_creation_date" TIMESTAMP DEFAULT now(),
    "crop_modification_date" TIMESTAMP DEFAULT now(),
    "crop_status" text,
    PRIMARY KEY ("id_crop")
);

-- Création de la table soil_cover
CREATE TABLE IF NOT EXISTS "soil_cover" (
    "id_soil_cover" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "type_soil_cover" character varying(50),
    PRIMARY KEY ("id_soil_cover")
);

-- Création de la table cultivation_bed
CREATE TABLE IF NOT EXISTS "cultivation_beds" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" character varying(100) NOT NULL,
    "description" text,
    "length" integer,
    "width" integer,
    "area" integer,
    "soilType" character varying(50),
    "phLevel" numeric,
    "fertilityLevel" character varying(50),
    "drainageLevel" character varying(50),
    "orientation" character varying(50),
    "commentary" text,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    "cultivationSpaceId" uuid NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "FK_cultivation_beds_spaces" FOREIGN KEY ("cultivationSpaceId") REFERENCES "cultivation_spaces"("id_cultivation_space")
);

-- Création de la table is_cultivated (relation many-to-many entre cultivation_spaces et crop)
CREATE TABLE IF NOT EXISTS "is_cultivated" (
    "id_cultivation_space" uuid NOT NULL,
    "id_crop" uuid NOT NULL,
    PRIMARY KEY ("id_cultivation_space", "id_crop"),
    CONSTRAINT "FK_is_cultivated_cultivation_spaces" FOREIGN KEY ("id_cultivation_space") REFERENCES "cultivation_spaces"("id_cultivation_space"),
    CONSTRAINT "FK_is_cultivated_crop" FOREIGN KEY ("id_crop") REFERENCES "crop"("id_crop")
);

-- Création de la table is_covered (relation many-to-many entre cultivation_spaces et soil_cover)
CREATE TABLE IF NOT EXISTS "is_covered" (
    "id_cultivation_space" uuid NOT NULL,
    "id_soil_cover" uuid NOT NULL,
    "cover_date_begin" date,
    "cover_date_end" date,
    PRIMARY KEY ("id_cultivation_space", "id_soil_cover"),
    CONSTRAINT "FK_is_covered_cultivation_spaces" FOREIGN KEY ("id_cultivation_space") REFERENCES "cultivation_spaces"("id_cultivation_space"),
    CONSTRAINT "FK_is_covered_soil_cover" FOREIGN KEY ("id_soil_cover") REFERENCES "soil_cover"("id_soil_cover")
);

-- Création de la table crop_cultivation_beds (relation many-to-many entre crop et cultivation_beds)
CREATE TABLE IF NOT EXISTS "crop_cultivation_beds" (
    "cropId" uuid NOT NULL,
    "cultivationBedId" uuid NOT NULL,
    PRIMARY KEY ("cropId", "cultivationBedId"),
    CONSTRAINT "FK_crop_cultivation_beds_crop" FOREIGN KEY ("cropId") REFERENCES "crop"("id_crop"),
    CONSTRAINT "FK_crop_cultivation_beds_bed" FOREIGN KEY ("cultivationBedId") REFERENCES "cultivation_beds"("id")
);

-- Insertion des rôles par défaut s'ils n'existent pas déjà
INSERT INTO "Role" ("id_role", "role_name")
SELECT 1, 'admin'
WHERE NOT EXISTS (SELECT 1 FROM "Role" WHERE "id_role" = 1);

INSERT INTO "Role" ("id_role", "role_name")
SELECT 2, 'user'
WHERE NOT EXISTS (SELECT 1 FROM "Role" WHERE "id_role" = 2);

-- Création de la table migrations pour suivre les migrations appliquées
CREATE TABLE IF NOT EXISTS "migrations" (
    "id" SERIAL PRIMARY KEY,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);

-- Enregistrement de cette migration comme appliquée
INSERT INTO "migrations" ("timestamp", "name") 
VALUES (1750613479320, 'InitialMigration1750613479320');
