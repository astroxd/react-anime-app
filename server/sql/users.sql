CREATE TABLE users (
   user_id serial PRIMARY KEY,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   username VARCHAR(50) NOT NULL,
   created_on TIMESTAMPTZ NOT NULL,
   avatar VARCHAR(255)
);