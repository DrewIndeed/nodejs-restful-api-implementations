var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "users.db.sqlite3";

let db = new sqlite3.Database(DBSOURCE,(err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    return;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          // Table already exists
          console.log(err.message);
          return;
        } else {
          // Table just created, creating some rows
          let insert =
            "INSERT INTO user (name, email, password) VALUES (?,?,?)";
          db.run(insert, ["admin", "admin@example.com", md5("admin123456")]);
          db.run(insert, ["user", "user@example.com", md5("user123456")]);
          console.log("Inserted 2 default rows");
        }
      }
    );
  }
});

module.exports = db;
