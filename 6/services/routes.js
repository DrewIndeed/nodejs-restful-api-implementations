const express = require("express");
const router = express.Router();
const md5 = require("md5");

// databases
const db = require("./database.js");

// http methods
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
  console.log(`Getting user data of id = ${req.params.id}`);
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

const udpateUserById = async (req, res) => {
  console.log(`Updating user data of id = ${req.params.id}`);
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password ? md5(req.body.password) : null,
  };

  let sql = "select * from user where id = ?";
  let params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    if (!row) {
      console.log(`User with id = ${req.params.id} Not Found! No update`);
      res.status(404).json({
        error: `User with id = ${req.params.id} Not Found! No Update!`,
      });
      return;
    }

    db.run(
      `UPDATE user set 
          name = COALESCE(?,name), 
          email = COALESCE(?,email), 
          password = COALESCE(?,password) 
          WHERE id = ?`,
      [data.name, data.email, data.password, req.params.id],
      (err) => {
        if (err) {
          res.status(400).json({ error: res.message });
          return;
        }

        console.log("Successfully update user data by id");
        res.json({
          message: "Update completed",
          data: data,
        });
      }
    );
  });
};

const createUser = async (req, res) => {
  console.log(`Creating new user data`);
  let errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }

  let data = {
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password),
  };

  let sql = "INSERT INTO user (name, email, password) VALUES (?,?,?)";
  let params = [data.name, data.email, data.password];
  db.run(sql, params, (err) => {
    if (err) {
      console.log("Cannot create new user data!");
      res.status(400).json({ error: err.message });
      return;
    }

    console.log(`Creating new user data successfully`);
    res.json({
      message: "Creation completed",
      data: data,
      id: this.lastID,
    });
  });
};

// create the route (the URL) and attach the method to it
router.route("/api/users").get(getAllUsers);
router.route("/api/user").post(createUser);
router
  .route("/api/users/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .put(udpateUserById);
module.exports = router;
