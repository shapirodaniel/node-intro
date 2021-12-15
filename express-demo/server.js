const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { v4: uuidv4 } = require("uuid");

const admins = { abc: "123" };
const leaderboard = {};

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
  res.status(200).send(leaderboard);
});

app.get("/api/leaderboard/:id", (req, res) => {
  const entry = leaderboard[req.params.id];
  entry.createdAt = new Date(entry.createdAt).toLocaleString();
  res.status(200).send(entry);
});

app.post("/api/newscore", jsonParser, (req, res) => {
  const id = uuidv4();
  const entry = { ...req.body, id, createdAt: Date.now() };
  leaderboard[id] = entry;
  res.status(201).send(entry);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
