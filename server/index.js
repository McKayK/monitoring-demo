const express = require("express");
const path = require("path");

const app = express();

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "97d6418ba8414010ad6381be17da0b1a",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

let students = [];

app.post("/api/student", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  students.push(name);

  rollbar.log("Student added successfully", {
    author: "McKay",
    type: "manual entry",
  });

  res.status(200).send(students);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Take us to warp ${port}!`));
