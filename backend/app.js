const express = require("express")
const app = express();
const prisma = require("./prisma/client");

app.get("/", async (req, res) => {
  res.send("hello world")
});

module.exports = app;