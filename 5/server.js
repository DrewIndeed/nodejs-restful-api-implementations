const express = require("express");
const app = express();
const path = require("path");
const bp = require("body-parser");
const router = express.Router();
// ! REMEMBER TO ADD THIS LINE: add router in express app
app.use("/", router);

/**
 * ! In order to get access to the post data we have to use body-parser 
 * ! Basically what the body-parser is which allows express to read the body 
 * ! and then parse that into a Json object that we can understand. 
 * ! It parses the HTTP request body.
*/
let urlencodedParser = bp.urlencoded({ extended: false });

// send html file to the server to display
console.log("This is __dirname:", __dirname);
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

router.post("/login", urlencodedParser, (req, res) => {
  // try to see what is the content of request body
  console.log(req.body);

  // get the data from the request body
  const username = req.body.username;
  const password = req.body.password;
  
  // print out the data by acessing the keys
  console.log("username = " + username + ", password = " + password);

  // give an h1 as a msg when the post request has been sent
  res.end(`<h1>Welcome back, ${username}!</h1>`);
});

// server port listenter
app.listen(8888, () => {
  console.log("Listening to port 8888...");
});
