// express related
const express = require("express");
const app = express();
const router = express.Router();
// other than express
const bp = require("body-parser");
const path = require("path");
const logger = require("morgan");

// ! REMEMBER TO ADD THIS LINE to add router in express app
app.use("/", router);

/**
 * ! In order to get access to the post data we have to use body-parser
 * ! Basically what the body-parser is which allows express to read the body
 * ! and then parse that into a Json object that we can understand.
 * ! It parses the HTTP request body.
 */
let urlencodedParser = bp.urlencoded({ extended: false });

/**
 * * Desired PORT and development environment
 */
const PORT = process.env.PORT || 8888;
const NODE_ENV = process.env.NODE_ENV || "development";
// the 'process' object (A HUGE ONE) provides information about, and control over, the current Node.js process.
// console.log(process);
// print out to see what value they get
console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
console.log(PORT);
console.log(NODE_ENV);
// setting port and env
app.set('port', PORT);
app.set('env', NODE_ENV);
console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
