#!/bin/bash 
set -e  

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE USER $APPLICATION_USER WITH PASSWORD '$POSTGRES_PASSWORD' CREATEDB;
CREATE DATABASE $APPLICATION_DB OWNER $APPLICATION_USER;
\connect $APPLICATION_DB $APPLICATION_USER
  BEGIN;
    CREATE TABLE users (
		user_id serial PRIMARY KEY,
		email VARCHAR ( 255 ) UNIQUE NOT NULL,
		password VARCHAR ( 255 ) NOT NULL,
		username VARCHAR ( 50 )  NOT NULL,
		created_on TIMESTAMPTZ NOT NULL,
		avatar VARCHAR(255)
	);
	CREATE TABLE lists (
		list_id serial PRIMARY KEY,
		code SMALLINT,
		user_id INTEGER,
		name VARCHAR( 255 ) NOT NULL,
		created_on TIMESTAMPTZ NOT NULL,
		CONSTRAINT fk_user
			FOREIGN KEY(user_id)
				REFERENCES users(user_id)
				ON DELETE CASCADE
	);
	CREATE TABLE listed_animes (
		listed_anime_id serial PRIMARY KEY,
		list_id INTEGER,
		user_id INTEGER, -- maybe useless
		anime_id INTEGER NOT NULL,
		anime_cover VARCHAR ( 255 ) NOT NULL,
		anime_title VARCHAR ( 255 ) NOT NULL,
		added_on TIMESTAMPTZ NOT NULL,
		CONSTRAINT fk_list
			FOREIGN KEY(list_id)
				REFERENCES lists(list_id)
				ON DELETE CASCADE
	);
	CREATE TABLE favorite_animes (
		favorite_anime_id serial PRIMARY KEY,
		user_id INTEGER,
		anime_id INTEGER NOT NULL,
		anime_cover VARCHAR ( 255 ) NOT NULL,
		anime_title VARCHAR ( 255 ) NOT NULL,
		added_on TIMESTAMPTZ NOT NULL,
		CONSTRAINT fk_user
			FOREIGN KEY(user_id)
				REFERENCES users(user_id)
				ON DELETE CASCADE
	);
	CREATE TABLE "session" (
		"sid" varchar NOT NULL COLLATE "default",
		"sess" json NOT NULL,
		"expire" timestamp(6) NOT NULL
 	)
 	WITH (OIDS=FALSE);

 	ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

 	CREATE INDEX "IDX_session_expire" ON "session" ("expire");
  COMMIT;

EOSQL