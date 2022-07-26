CREATE TABLE lists (
    list_id serial PRIMARY KEY,
    code SMALLINT, -- 1 = watchlist, 2=planning
    user_id INTEGER,
    name VARCHAR( 255 ) NOT NULL,
    created_on TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES user(user_id)
            ON DELETE CASCADE
);

CREATE TABLE listed_animes (
    listed_anime_id serial PRIMARY KEY,
    list_id INTEGER,
    user_id INTEGER,
    anime_id INTEGER NOT NULL,
    anime_cover VARCHAR ( 255 ) NOT NULL,
    CONSTRAINT fk_list
        FOREIGN KEY(list_id)
            REFERENCES lists(list_id)
            ON DELETE CASCADE
);