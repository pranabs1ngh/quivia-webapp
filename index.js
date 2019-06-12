const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();

app.get('/', (req, res) => {
  res.send("Hello World!! Node is working properly.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));