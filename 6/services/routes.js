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

const getUserById = async (req, res, next) => {
  let sql = "select * from user where id = ?";
  let params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    if (!row) {
      res
        .status(404)
        .json({ error: `User with id = ${req.params.id} Not Found!` });
      return;
    }

    res.json({
      message: "success",
      data: row,
    });
  });
};

// create the route (the URL) and attach the method to it
router.route("/api/users").get(getAllUsers);
router.route("/api/users/:id").get(getUserById);
module.exports = router;
