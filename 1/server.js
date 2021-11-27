//REST API demo in Node.js
let express = require("express"); // requre the express framework
let app = express();
let router = express.Router();
let fs = require("fs"); //require file system object
app.use("/", router); // add router in express app

// * Endpoint to Get a list of users (using express get method)
// app.get("/getUsers", function (req, res) {
//   fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
//     console.log(data);
//     res.end(data); // you can also use res.send()
//   });
// });

// * Endpoint to Get a list of users (using Router version)
router.get("/getUsers", (req, res) => {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data); // you can also use res.send()
  });
});

// Create a server to listen at port 8080
let server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("REST API demo app listening at http://%s:%s", host, port);
});
