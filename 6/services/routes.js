const express = require("express");
const router = express.Router();

// databases
const db = require("./database.js");

const getAllUsers = async (req, res, next) => {
  let sql = "select * from user";
  let params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
};

// create the route (the URL) and attach the method to it
router.route("/api/users").get(getAllUsers);
module.exports = router;
