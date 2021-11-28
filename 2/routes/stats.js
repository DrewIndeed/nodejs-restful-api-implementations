const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const getStatById = async (req, res, next) => {
  try {
    // retrieve all players from database
    const data = fs.readFileSync(path.join(__dirname, "./stats.json"));

    // parse data from string to JSON array
    const stats = JSON.parse(data);

    // the player that matches with requested id
    const playerStats = stats.find(
      (player) => player.id === Number(req.params.id)
    );

    // if there is no player with id as requested, throw error
    if (!playerStats) {
      const err = new Error(`Player with id = ${req.params.id} not found`);
      err.status = 404;
      throw err;
    }
    // otherwise, return player's stat in form of json
    res.json(playerStats);
  } catch (e) {
    next(e);
  }
};

const deleteStatById = async (req, res, next) => {
  try {
    // retrieve all players from database
    const data = fs.readFileSync(path.join(__dirname, "./stats.json"));

    // parse data from string to JSON array
    const stats = JSON.parse(data);

    // the player that matches with requested id
    const playerStats = stats.find(
      (player) => player.id === Number(req.params.id)
    );

    // if there is no player with id as requested, throw error
    if (!playerStats) {
      const err = new Error(
        `Target player with id = ${req.params.id} not found. No deletion!`
      );
      err.status = 404;
      throw err;
    }

    // create new stats which EXCLUDED the target player to delete
    // by setting it as null
    const newStats = stats
      .map((player) => {
        // if the player's id matches with requested id, set it as a null item
        if (player.id === Number(req.params.id)) {
          return null;
          // otherwise, return player data
        } else {
          return player;
        }
      })
      // filter out only the players that were returned
      .filter((player) => player !== null);

    // overwrite the database file to update it
    fs.writeFileSync(
      path.join(__dirname, "./stats.json"),
      JSON.stringify(newStats)
    );

    // end request and set status as success
    console.log("Deleted successfully!");
    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

const updateStatById = async (req, res, next) => {
  try {
    // retrieve all players from database
    const data = fs.readFileSync(path.join(__dirname, "./stats.json"));

    // parse data from string to JSON array
    const stats = JSON.parse(data);

    // the player that matches with requested id
    const playerStats = stats.find(
      (player) => player.id === Number(req.params.id)
    );

    // if there is no player with id as requested, throw error
    if (!playerStats) {
      const err = new Error(
        `Target player with id = ${req.params.id} not found. No update!`
      );
      err.status = 404;
      throw err;
    }

    // create object to contain updated information
    const newStatsData = {
      id: Number(req.body.id),
      wins: Number(req.body.wins),
      losses: Number(req.body.losses),
      points_scored: Number(req.body.points_scored),
    };
    // print out to see the values of body's keys
    // to see if they are undefined or not
    console.table(newStatsData);

    // create a new array with updated data
    const newStats = stats.map((player) => {
      // if the player's id matches the requested id, replace it with the new object
      if (player.id === Number(req.params.id)) {
        return newStatsData;
        // otherwise, return the original player
      } else {
        return player;
      }
    });

    // overwrite the database file to update it
    fs.writeFileSync(
      path.join(__dirname, "./stats.json"),
      JSON.stringify(newStats)
    );

    // end request + set status as success + return updated data object
    res.status(200).json(newStatsData);
  } catch (e) {
    next(e);
  }
};

const getAllStats = async (req, res, next) => {
  try {
    // retrieve all players from database
    const data = fs.readFileSync(path.join(__dirname, "./stats.json"));

    // parse data from string to JSON array
    const allStats = JSON.parse(data);

    // if there is no player with id as requested
    if (Object.keys(allStats).length === 0) {
      const err = new Error("Database is empty");
      err.status = 404;
      throw err;
    }
    // otherwise, return player's stat in form of json
    res.json(allStats);
  } catch (e) {
    next(e);
  }
};

const createStats = async (req, res, next) => {
  try {
    // retrieve all players from database
    const data = fs.readFileSync(path.join(__dirname, "./stats.json"));

    // parse data from string to JSON array
    const allStats = JSON.parse(data);

    // create object to contain new information
    const newStatsData = {
      id: Number(req.body.id),
      wins: Number(req.body.wins),
      losses: Number(req.body.losses),
      points_scored: Number(req.body.points_scored),
    };

    // push into parsed data array
    allStats.push(newStatsData);
    // print to see if new data has been added to array before updating database
    console.log(allStats);

    // overwrite the database file to update it
    fs.writeFileSync(
      path.join(__dirname, "./stats.json"),
      JSON.stringify(allStats)
    );

    // end request + set status as success + return updated data object
    res.status(201).json(newStatsData);
  } catch (e) {
    next(e);
  }
};

// create the route (the URL) and attach the method to it
router.route("/").get(getAllStats);
router.route("/api/v1/stats").post(createStats);
router
  .route("/api/v1/stats/:id")
  .get(getStatById)
  .delete(deleteStatById)
  .put(updateStatById);
module.exports = router;
