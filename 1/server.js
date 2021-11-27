//REST API demo in Node.js
let express = require("express"); // requre the express framework
let app = express();
let fs = require("fs"); //require file system object
console.log(__dirname);

// Endpoint to Get a list of users
app.get("/getUsers", function (req, res) {
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
