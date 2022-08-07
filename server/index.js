const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();

//* Login stuff
const bcrypt = require("bcrypt");
const saltRounds = 10;

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
//*

//* File handling
const fileUpload = require("express-fileupload");
app.use(fileUpload());
const { v4: uuidv4 } = require("uuid");
app.use("/api/static", express.static("static"));
//*

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

const getConnectionString = require("./getConnectionString");
const pool = new Pool({
  connectionString: getConnectionString(),
  max: 3,
});

app.use(
  session({
    store: new pgSession({ pool: pool }),
    key: "user",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000 * 10,
      secure: false,
    },
  })
);

//* GET user lists
app.get("/api/lists/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const client = await pool.connect();

  const selectListsQuery = {
    text: "SELECT * FROM lists WHERE user_id = $1",
    values: [user_id],
  };

  client.query(selectListsQuery, (err, result) => {
    if (err) console.log(err);
    res.send(result.rows);
  });
  client.release();
});

//* GET list entries
app.get("/api/lists/list/:list_id/:page", async (req, res) => {
  console.log("entries");
  const { list_id, page } = req.params;
  const PER_PAGE = 4;

  const client = await pool.connect();

  const selectListEntriesQuery = {
    text: "SELECT * FROM listed_animes WHERE list_id = $1 ORDER BY listed_anime_id OFFSET (($2-1) * $3) ROWS FETCH NEXT $3 ROWS ONLY",
    values: [list_id, page, PER_PAGE],
  };

  client.query(selectListEntriesQuery, (err, result) => {
    if (err) console.log(err);
    client.query(
      "SELECT COUNT(*) FROM listed_animes WHERE list_id = $1",
      [list_id],
      (error, response) => {
        if (error) console.log(error);
        res.send({
          data: result.rows,
          lastPage: Math.ceil(response.rows[0].count / PER_PAGE),
        });
      }
    );
  });

  client.release();
});

app.get("/api/lists/list/:list_id", async (req, res) => {
  console.log("search");
  const { list_id } = req.params;
  const search = req.query.q;
  const client = await pool.connect();

  const searchListEntriesQuery = {
    text: "SELECT * FROM listed_animes WHERE list_id = $1 AND LOWER(anime_title) LIKE '%' || $2 || '%'",
    values: [list_id, search.toLocaleLowerCase()],
  };

  client.query(searchListEntriesQuery, (err, result) => {
    if (err) console.log(err);
    res.send(result.rows);
  });

  client.release();
});

//* ADD list entrie
//*      "/api/lists/list/:list_id/insert"
app.post("/api/lists/list/:list_id", async (req, res) => {
  const { list_id } = req.params;
  const { user_id, anime_id, anime_cover, anime_title } = req.body;

  if (!user_id || !anime_id || !anime_cover || !anime_title)
    console.log("error data missing");

  const client = await pool.connect();

  const insertListEntrieQuery = {
    text: "INSERT INTO listed_animes (list_id, user_id, anime_id, anime_cover, anime_title, added_on) VALUES ($1,$2,$3,$4,$5, CURRENT_TIMESTAMP)",
    values: [list_id, user_id, anime_id, anime_cover, anime_title],
  };

  client.query(insertListEntrieQuery, (err, result) => {
    if (err) {
      console.log(err);
      return res.send({ error: "Unable to add anime to list" });
    }
    res.send({ message: "Succesfully added anime to list" });
  });

  client.release();
});

//* GET anime entrie lists
app.get("/api/lists/list/anime/:user_id/:anime_id", async (req, res) => {
  console.log("anime entrie list");
  const { user_id, anime_id } = req.params;
  console.log(user_id, anime_id);
  const client = await pool.connect();

  const getAnimeEntriesQuery = {
    text: "SELECT list_id FROM listed_animes WHERE user_id = $1 AND anime_id = $2",
    values: [user_id, anime_id],
  };

  client.query(getAnimeEntriesQuery, async (err, result) => {
    if (err) {
      console.log(err);
    }

    const codeList = await getAnimeEntrieCodeList(result.rows);

    res.send({ lists: result.rows, codeList: codeList });
  });

  client.release();
});

const getAnimeEntrieCodeList = async (lists_id) => {
  let codeList;

  const client = await pool.connect();

  for (let i = 0; i < lists_id.length; i++) {
    const getCodeList = {
      text: "SELECT * FROM lists WHERE list_id = $1 AND code IS NOT NULL",
      values: [lists_id[i].list_id],
    };
    const res = await client.query(getCodeList);
    if (res.rows.length > 0) {
      codeList = res.rows[0];
      break;
    }
  }
  client.release();
  return codeList;
};

//* DELETE ANIME ENTRIE
app.delete("/api/lists/list/:list_id/:anime_id", async (req, res) => {
  const { list_id, anime_id } = req.params;

  const client = await pool.connect();

  const deleteAnimeEntrie = {
    text: "DELETE FROM listed_animes WHERE list_id = $1 AND anime_id = $2",
    values: [list_id, anime_id],
  };

  client.query(deleteAnimeEntrie, (err, result) => {
    if (err) console.log("error");
    res.send({ message: "Succefully deleted anime entrie" });
  });

  client.release();
});

//* GET FAVORITES
app.get("/api/favorites/:user_id/:page", async (req, res) => {
  const { user_id, page } = req.params;
  const PER_PAGE = 4;

  const client = await pool.connect();

  const selectFavoritesQuery = {
    text: "SELECT * FROM favorite_animes WHERE user_id = $1 ORDER BY favorite_anime_id OFFSET (($2-1) * $3) ROWS FETCH NEXT $3 ROWS ONLY",
    values: [user_id, page, PER_PAGE],
  };

  client.query(selectFavoritesQuery, (err, result) => {
    if (err) console.log(err);
    client.query(
      "SELECT COUNT(*) FROM favorite_animes WHERE user_id = $1",
      [user_id],
      (error, response) => {
        if (error) console.log(error);
        res.send({
          data: result.rows,
          lastPage: Math.ceil(response.rows[0].count / PER_PAGE),
        });
      }
    );
  });
  client.release();
});

//* SEARCH FAVORITES
app.get("/api/favorites/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const search = req.query.q;
  const client = await pool.connect();

  const searchFavoritesQuery = {
    text: "SELECT * FROM favorite_animes WHERE user_id = $1 AND LOWER(anime_title) LIKE '%' || $2 || '%'",
    values: [user_id, search.toLocaleLowerCase()],
  };

  client.query(searchFavoritesQuery, (err, result) => {
    if (err) console.log(err);
    res.send(result.rows);
  });

  client.release();
});

//* CHECK IF IN FAVORITES
app.get("/api/favorites/anime/:user_id/:anime_id", async (req, res) => {
  const { user_id, anime_id } = req.params;
  const client = await pool.connect();

  const inFavoritesQuery = {
    text: "SELECT 1 FROM favorite_animes WHERE user_id = $1 AND anime_id = $2",
    values: [user_id, anime_id],
  };

  client.query(inFavoritesQuery, (err, result) => {
    if (err) console.log(err);
    if (result.rowCount > 0) {
      res.send({ data: true });
    } else {
      res.send({ data: false });
    }
  });

  client.release();
});

//* ADD TO FAVORITES
app.post("/api/favorites/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { anime_id, anime_cover, anime_title } = req.body;

  if (!anime_id || !anime_cover || !anime_title)
    console.log("error data missing");

  const client = await pool.connect();

  const insertFavoriteQuery = {
    text: "INSERT INTO favorite_animes (user_id, anime_id, anime_cover, anime_title, added_on) VALUES ($1,$2,$3,$4, CURRENT_TIMESTAMP)",
    values: [user_id, anime_id, anime_cover, anime_title],
  };

  client.query(insertFavoriteQuery, (err, result) => {
    if (err) {
      console.log(err);
      return res.send({ error: "Unable to add anime to favorites" });
    }
    res.send({ message: "Succesfully added anime to favorites" });
  });

  client.release();
});

//* DELETE FROM FAVORITES
app.delete("/api/favorites/:user_id/:anime_id", async (req, res) => {
  const { user_id, anime_id } = req.params;

  const client = await pool.connect();

  const deleteFavorite = {
    text: "DELETE FROM favorite_animes WHERE user_id = $1 AND anime_id = $2",
    values: [user_id, anime_id],
  };

  client.query(deleteFavorite, (err, result) => {
    if (err) console.log("error");
    res.send({ message: "Succefully deleted anime entrie" });
  });

  client.release();
});
//* REGISTER user
app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;
  //* If file sent is not an image return null (valid image/jpeg, image/png, image/svg+xml)
  const avatar = req.files?.avatar?.mimetype?.startsWith("image/")
    ? req.files.avatar
    : null;

  if (!email || !password || !username) {
    return res.send({ error: "Missing Email, Password or Username" });
  }

  //* Check if user already exists
  const client = await pool.connect();
  const selectQuery = {
    text: "SELECT 1 FROM users WHERE (email) = $1",
    values: [email],
  };

  const result = await client.query(selectQuery);

  if (result.rowCount > 0) {
    client.release();
    return res.send({ error: "User already exists" });
  }
  //*

  //* Crypt password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  if (!hashedPassword) {
    client.release();
    return res.send({ error: "Can't hash password" });
  }
  //*

  //* Rename and move avatar
  let avatarName;
  if (avatar) {
    const avatarId = uuidv4(); //* Generate uuid
    avatarName = `${avatarId}.${avatar.mimetype.replace("image/", "")}`; //* Get extension

    const path = `${__dirname}/static/avatars/${avatarName}`;
    avatar.mv(path, (err) => {
      if (err) console.log(err);
    });
  }
  //*

  //* Insert user in DB
  const insertQuery = {
    text: `INSERT INTO users (email, password, username, created_on, avatar
    ) VALUES ($1,$2,$3, CURRENT_TIMESTAMP, $4) RETURNING user_id, created_on`,
    values: [email, hashedPassword, username, avatarName],
  };

  client.query(insertQuery, (err, result) => {
    if (err) {
      console.log(err);
      return res.send({ error: "Can't insert user in DB" });
    }

    const user = {
      id: result.rows[0].user_id,
      email,
      username,
      created_on: result.rows[0].created_on,
      //* If avatar is null return image based on username
      avatar: avatar
        ? `http://localhost:3001/api/static/avatars/${avatarName}`
        : `https://avatars.dicebear.com/api/initials/${username}.svg`,
    };

    //* Update session
    req.session.user = user;
    res.send({
      message: "User registered succesfully",
      user,
    });

    //* Create user default lists
    createDefaultUserLists(user.id);
  });
  //*

  client.release();
});

const createDefaultUserLists = async (user_id) => {
  const client = await pool.connect();
  const defaultLists = [
    { code: 1, name: "Watching" },
    { code: 2, name: "Planning" },
    { code: 3, name: "Completed" },
    { code: 4, name: "Dropped" },
  ];

  defaultLists.map(({ code, name }) => {
    const createListQuery = {
      text: "INSERT INTO lists (code, user_id, name, created_on) VALUES ($1,$2,$3, CURRENT_TIMESTAMP)",
      values: [code, user_id, name],
    };
    client.query(createListQuery, (err, res) => {
      if (err) console.log(err);
    });
  });
  client.release();
};

//* GET Login session
app.get("/api/login", (req, res) => {
  console.log("get session");
  if (req.session.user) {
    res.send({ user: req.session.user });
  } else {
    res.send({});
  }
});

//* LOGIN user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({ error: "Missing Email or Password" });
  }

  //* Get user
  const client = await pool.connect();
  const selectQuery = {
    text: "SELECT * FROM users WHERE (email) = $1",
    values: [email],
  };

  client.query(selectQuery, async (err, result) => {
    if (err) return res.send({ error: "Can't query user from DB" });

    if (result.rows.length > 0) {
      const { user_id, email, username, avatar, created_on } = result.rows[0];
      const user = {
        id: user_id,
        email,
        username,
        created_on,
        //* If avatar is null return image based on username
        avatar: avatar
          ? `http://localhost:3001/api/static/avatars/${result.rows[0].avatar}`
          : `https://avatars.dicebear.com/api/initials/${result.rows[0].username}.svg`,
      };

      //* Compare password
      const passwordMatch = await bcrypt.compare(
        password,
        result.rows[0].password
      );
      if (!passwordMatch) return res.send({ error: "Wrong Password" });
      //*

      //* Update session
      req.session.user = user;

      res.send({
        message: "User Login successfully",
        user,
      });
    } else {
      res.send({ error: "Unknown user" });
    }
    //*
    client.release();
  });
});

//* LOGOUT user
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send({ error: "Can't destroy session" });

    res.send({ message: "User logout successfully", user: {} });
  });
});

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

//? Use this to change parse function of postgres
//* https://node-postgres.com/features/queries
// const { types } = require("pg");
// var parseFn = function (val) {
//   return val === null ? null : new Date(Date.parse(val));
// };
// types.setTypeParser(types.builtins.TIMESTAMPTZ, parseFn);
