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

const pool = new Pool({
  host: "localhost",
  user: "andre",
  password: "andrea2004",
  database: "anime_app",
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
      maxAge: 60 * 60 * 24 * 1000,
    },
  })
);

//! If you're gonna have problems with async operation add this to function
//! Instead of try/catch
// const asyncMiddleware = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

//* GET watchlist
app.get("/api/watchlist/list", async (req, res) => {
  const sqlSelect = "SELECT * FROM watch_list";
  const client = await pool.connect();

  client.query(sqlSelect, (err, result) => {
    console.log(result.rows);
    res.send(result.rows);
    client.release();
  });
});

//* GET if exist in watchlist (true/false)
app.get("/api/watchlist/list/:id", async (req, res) => {
  const id = req.params.id;
  const sqlSelect = "SELECT FROM watch_list WHERE id = $1";

  const client = await pool.connect();
  client.query(sqlSelect, [id], (err, result) => {
    if (err) console.log(err);
    console.log(result.rows);
    if (result.rows.length === 0) {
      console.log("empty");
      res.status(200).send({ message: false });
    } else {
      res.status(200).send({ message: true });
    }
    client.release();
  });
});

//* INSERT into watchlist
app.post("/api/watchlist/insert", async (req, res) => {
  const anime_id = req.body.id;
  const sqlInsert = "INSERT INTO watch_list (id) VALUES ($1)";

  const client = await pool.connect();
  client.query(sqlInsert, [anime_id], (err, result) => {
    if (err) console.error(err);
    res.status(201).send({ message: "data inserted" });
    client.release();
  });
});

//* DELETE from watchlist
app.delete("/api/watchlist/delete/:id", async (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM watch_list WHERE id = $1";

  const client = await pool.connect();
  client.query(sqlDelete, [id], (err, result) => {
    if (err) console.log(err);
    res.status(204).send({ message: "data removed" });
    client.release();
  });
});

//* GET favorite_list
app.get("/api/favorite/list", async (req, res) => {
  const sqlSelect = "SELECT * FROM favorite_list";

  const client = await pool.connect();
  client.query(sqlSelect, (err, result) => {
    console.log(result.rows);
    res.send(result.rows);
    client.release();
  });
});

//* GET if exist in favorite_list (true/false)
app.get("/api/favorite/list/:id", async (req, res) => {
  const id = req.params.id;
  const sqlSelect = "SELECT FROM favorite_list WHERE mal_id = $1";

  const client = await pool.connect();
  client.query(sqlSelect, [id], (err, result) => {
    if (err) console.log(err);
    console.log(result.rows);
    if (result.rows.length === 0) {
      console.log("empty");
      res.status(200).send({ message: false });
    } else {
      res.status(200).send({ message: true });
    }
    client.release();
  });
});

//* INSERT into favorite_list
app.post("/api/favorite/insert", async (req, res) => {
  const anime_id = req.body.id;
  const sqlInsert = "INSERT INTO favorite_list (mal_id) VALUES ($1)";

  const client = await pool.connect();
  client.query(sqlInsert, [anime_id], (err, result) => {
    res.status(201).send({ message: "data inserted" });
    client.release;
  });
});

//* DELETE from favorite_lsit
app.delete("/api/favorite/delete/:id", async (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM favorite_list WHERE mal_id = $1";

  const client = await pool.connect();
  client.query(sqlDelete, [id], (err, result) => {
    if (err) console.log(err);
    res.status(204).send({ message: "data removed" });
    client.release();
  });
});

//* REGISTER user
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({ error: "Missing Email or Password" });
  }
  const client = await pool.connect();
  const sqlSelect = "SELECT 1 FROM users WHERE (email) = $1";

  const result = await client.query(sqlSelect, [email]);

  if (result.rowCount > 0) {
    client.release();
    return res.send({ error: "User already exists" });
  }

  const sqlInsert =
    "INSERT INTO users (email, password, username) VALUES ($1,$2,$1)";

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (hashedPassword) {
    client.query(sqlInsert, [email, hashedPassword], (err, result) => {
      if (err) return res.send({ error: "Can't insert user in DB" });

      //* Update session
      req.session.user = { email, password, username: email };

      res.status(201).send({
        message: "User registered succesfully",
        user: { email, username: email },
      });
    });
  } else {
    res.send({ error: "Can't hash password" });
  }
  client.release();
});

//* GET Login session
app.get("/api/login", (req, res) => {
  if (req.session.user) {
    const { email, username } = req.session.user;
    res.send({ user: { email, username } });
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

  const sqlSelect = "SELECT * FROM users WHERE (email) = $1";

  const client = await pool.connect();

  client.query(sqlSelect, [email], async (err, result) => {
    if (err) return res.send({ error: "Can't query user from DB" });

    if (result.rows.length > 0) {
      const user = result.rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        //* Update session
        req.session.user = user;

        res.send({
          message: "User Login successfully",
          user: { email: user.email, username: user.username },
        });
      } else {
        res.send({ error: "Wrong Password" });
      }
    } else {
      res.send({ error: "Unknown user" });
    }

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
