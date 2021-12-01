const express = require("express");
const router = express.Router();

// databases
const db = require("./database.js");

const getAllUsers = async (req, res) => {
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

const getUserById = async (req, res) => {
  console.log(`Getting user data of id = ${res.params.id}`);
  let sql = "select * from user where id = ?";
  let params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    if (!row) {
      console.log(`User with id = ${req.params.id} Not Found!`);
      res
        .status(404)
        .json({ error: `User with id = ${req.params.id} Not Found!` });
      return;
    }

    console.log("Successfully get user data by id");
    res.json({
      message: "success",
      data: row,
    });
  });
};

const deleteUserById = async (req, res) => {
  console.log(`Deleting user data of id = ${req.params.id}`);
  let sql = "select * from user where id = ?";
  let params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    if (!row) {
      console.log(`User with id = ${req.params.id} Not Found! No deletion`);
      res.status(404).json({
        error: `User with id = ${req.params.id} Not Found! No Deletion!`,
      });
      return;
    }

    db.run("DELETE FROM user WHERE id = ?", req.params.id, (err) => {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }

      console.log("Successfully delete user data by id");
      res.json({
        message: "Deletion completed",
        user_id: req.params.id,
      });
    });
  });
};

// create the route (the URL) and attach the method to it
router.route("/api/users").get(getAllUsers);
router.route("/api/users/:id").get(getUserById).delete(deleteUserById);
module.exports = router;
