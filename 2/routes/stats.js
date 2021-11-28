const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const getStatById = async (req, res, next) => {
  try {
    // retrieve all players from database
    const data = fs.readFileSync(path.join(__dirname, "./stats.json"));

    // parse data from string to JSON object
    const stats = JSON.parse(data);

    // the player that matches with requeted id
    const playerStats = stats.find(
      (player) => player.id === Number(req.params.id)
    );

    // if there is no player with id as requested
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

// create the route (the URL) and attach the method to it
router.route("/api/v1/stats/:id").get(getStatById);
module.exports = router;
