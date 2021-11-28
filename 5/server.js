const express = require("express");
const app = express();
const path = require("path");
const bp = require("body-parser");
const router = express.Router();

// send html file to the server to display
console.log("This is __dirname:", __dirname);
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

// server port listenter
app.listen(8888, () => {
  console.log("Listening to port 8888...");
});
