const express = require("express");
const cors = require("cors");
const app = express();

//* Login stuff
const bcrypt = require("bcrypt");
const saltRounds = 10;

const cookieParser = require("cookie-parser");
const session = require("express-session");
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

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    key: "userID",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000,
    },
  })
);

const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "andrea2004",
  database: "anime_app",
});

client.connect();

//* GET watchlist
app.get("/api/watchlist/list", (req, res) => {
  const sqlSelect = "SELECT * FROM watch_list";
  client.query(sqlSelect, (err, result) => {
    console.log(result.rows);
    res.send(result.rows);
  });
});

//* GET if exist in watchlist (true/false)
app.get("/api/watchlist/list/:id", (req, res) => {
  const id = req.params.id;

  const sqlSelect = "SELECT FROM watch_list WHERE id = $1";
  client.query(sqlSelect, [id], (err, result) => {
    if (err) console.log(err);
    console.log(result.rows);
    if (result.rows.length === 0) {
      console.log("empty");
      res.status(200).send({ message: false });
    } else {
      res.status(200).send({ message: true });
    }
  });
});

//* INSERT into watchlist
app.post("/api/watchlist/insert", (req, res) => {
  const anime_id = req.body.id;
  const sqlInsert = "INSERT INTO watch_list (id) VALUES ($1)";
  client.query(sqlInsert, [anime_id], (err, result) => {
    res.status(201).send({ message: "data inserted" });
  });
});

//* DELETE from watchlist
app.delete("/api/watchlist/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM watch_list WHERE id = $1";
  client.query(sqlDelete, [id], (err, result) => {
    if (err) console.log(err);
    res.status(204).send({ message: "data removed" });
  });
});

//* REGISTER user
app.post("/api/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sqlInsert =
    "INSERT INTO users (email, password, username) VALUES ($1,$2,$1)";

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) console.log("err", err);
    client.query(sqlInsert, [email, hash], (err, result) => {
      if (err) console.log(err);
      else res.status(201).send({ message: "user registered succesfully" });
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
app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM users WHERE (email) = $1";
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
  });
});

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

app.listen(3001, () => {
  console.log("running on port 3001");
});
