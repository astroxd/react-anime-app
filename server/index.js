const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
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

app.get("/api/watchlist/list", (req, res) => {
  const sqlSelect = "SELECT * FROM watch_list";
  client.query(sqlSelect, (err, result) => {
    res.send(result.rows);
  });
});

app.post("/api/watchlist/insert", (req, res) => {
  const anime_id = req.body.id;
  const sqlInsert = "INSERT INTO watch_list (id) VALUES ($1)";
  client.query(sqlInsert, [anime_id], (err, result) => {});
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
