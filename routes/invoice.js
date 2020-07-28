var db = require("../config/databaseConnection");
var express = require("express");
var router = express.Router();

// Get the Menu Page
router.get("/", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/users/login");
  } else {
    res.render("invoice");
  }
});

// Query to get all items
router.get("/query", function (req, res) {
  console.log("Getting Invoice Items");
  const restID = 1;

  db.query(`SELECT * FROM orders  WHERE restID = "${restID}"`, function (
    err,
    result,
    fields
  ) {
    String(result);
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
