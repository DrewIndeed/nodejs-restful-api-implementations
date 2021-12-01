const express = require("express");
const router = express.Router();

const printMeToTest = async (req, res, next) => {
  try {
    res.end("<h1>I THINK I DID IT!</h1>")
  } catch (e) {
    next(e);
  }
};

// create the route (the URL) and attach the method to it
router.route("/").get(printMeToTest);
module.exports = router;
