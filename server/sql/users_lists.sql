CREATE TABLE lists (
    list_id serial PRIMARY KEY,
    code SMALLINT, -- 1: watchlist,2: planning, 3: completed, 4: dropped
    user_id INTEGER,
    name VARCHAR( 255 ) NOT NULL,
    created_on TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
    -- ADD total animes in list
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
)