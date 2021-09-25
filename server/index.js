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
  user: "postgres",
  password: "andrea2004",
  database: "anime_app",
  max: 3,
});

app.use(
  session({
    store: new pgSession({ pool: pool }),
    key: "userID",
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
  const email = req.body.email;
  const password = req.body.password;

  const sqlInsert =
    "INSERT INTO users (email, password, username) VALUES ($1,$2,$1)";

  const client = await pool.connect();
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) console.error("err", err);
    client.query(sqlInsert, [email, hash], (err, result) => {
      if (err) console.error(err);
      else
        res.status(201).send({
          message: "user registered succesfully",
          user: { email, password, username: email },
        });
      client.release();
    });
  });
});

//* GET Login session
app.get("/api/login", (req, res) => {
  if (req.session.user) {
    res.status(200).send({ logged: true, user: req.session.user });
  } else {
    res.send({ logged: false });
    // res.status(400).send({ logged: false });
  }
});

//* LOGIN user
app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM users WHERE (email) = $1";

  const client = await pool.connect();
  client.query(sqlSelect, [email], (err, result) => {
    if (err) {
      res.send({ err });
      console.log(err);
    }

    if (result.rows.length > 0) {
      const userObj = result.rows[0];

      bcrypt.compare(password, userObj.password, (error, response) => {
        if (response) {
          req.session.user = userObj;
          res.send(userObj);
        } else {
          res.send({ message: "error with credential" });
        }
      });
    } else {
      res.send({ message: "Unknown user" });
    }

    client.release();
  });
});

//* LOGOUT user
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    if (!req.session) {
      res.status(200).json({ logout: true });
    } else {
      res.status(500).json({ logout: false });
    }
  });
});

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
