// express related
const express = require("express");
const app = express();

// other than express
const bodyParser = require("body-parser");
const path = require("path");
const pretty = require("express-prettify");
app.use(pretty({ query: "pretty" }));
const logger = require("morgan");
app.use(logger("tiny"));

// desired PORT and development environment
const PORT = process.env.PORT || 6868;
const NODE_ENV = process.env.NODE_ENV || "development";
app.set("port", PORT);
app.set("env", NODE_ENV);

// use body parser (to handle POST methods)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting routes as default folder when the app first starts
app.use("/", require(path.join(__dirname, "./services/routes.js")));

// endpoints to handle error of code: 404 and 500
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  console.log("Manual Error Printing:", err.message);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// server port listener - port 6868
app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get(
      "port"
    )} | Environment : ${app.get("env")}`
  );
});
