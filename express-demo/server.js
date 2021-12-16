const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const admins = { abc: "123" };
let leaderboard = [];

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("nothing here!");
});

app.get("/api", (req, res) => {
  res.status(200).send("api entry point, no data here");
});

app.get("/api/admin", (req, res) => {
  const { user } = req.query;
  const { id } = JSON.parse(user);

  if (!user || !admins[id]) {
    return res.status(401).send("401 unauthorized");
  }

  res.send("Admin access granted");
});

app.get("/api/leaderboard", (req, res) => {
  leaderboard = leaderboard.slice(0, 3);
  res.status(200).send({ leaderboard });
});

app.get("/api/leaderboard/:id", (req, res) => {
  const entry = leaderboard[req.params.id];
  entry.createdAt = new Date(entry.createdAt).toLocaleString();
  res.status(200).send(entry);
});

app.post("/api/newscore", jsonParser, (req, res) => {
  const id = uuidv4();
  const entry = { ...req.body, id, createdAt: Date.now() };
  leaderboard.push(entry);

  // this is a super lazy way of making sure new entries end up in top score order
  // we can do this because we're only ever going to retain a finite number of scores
  // so we'll never be forced to sort a large dataset
  leaderboard.sort((a, b) => (+a.score > +b.score ? -1 : 1));

  res.status(201).send(entry);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
