// express related
const express = require("express");
const app = express();

// other than express
const bp = require("body-parser");
const path = require("path");
const logger = require("morgan");

// desired PORT and development environment
const PORT = process.env.PORT || 8888;
const NODE_ENV = process.env.NODE_ENV || "development";
app.set("port", PORT);
app.set("env", NODE_ENV);

// use morgan and body parser
app.use(logger("tiny"));
app.use(bp.json());

// setting routes as default folder when the app first starts
app.use("/", require(path.join(__dirname, "./routes/stats.js")));

// endpoints to handle error of code: 404 and 500
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// server port listener - port 8888
app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get(
      "port"
    )} | Environment : ${app.get("env")}`
  );
});
