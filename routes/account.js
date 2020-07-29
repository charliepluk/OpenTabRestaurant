var db = require("../config/databaseConnection");
var express = require("express");
var router = express.Router();

// Get the Menu Page
router.get("/", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/users/login");
  } else {
    res.render("account");
  }
});

// UPDATE ACCOUNT INFO
router.post("/update", function (req, res) {
  const restID = req.user.restID;
  const { openTime, closeTime, description } = req.body;

  db.query(
    `UPDATE restaurants SET ? WHERE restID="${restID}"`,
    {
      openTime: openTime,
      closeTime: closeTime,
      description: description,
    },
    (err, result) => {
      if (err) {
        console.log("Unable to Update Item!");
        res.render("account");
      } else {
        console.log("Updated Item!");
        res.render("account");
      }
    }
  );
});

// Query to get all items
router.get("/query", function (req, res) {
  console.log("Getting Restaurant Info");
  const restID = req.user.restID;

  db.query(`SELECT * FROM restaurants WHERE restID = "${restID}"`, function (
    err,
    result,
    fields
  ) {
    String(result);
    res.send(result);
  });
});

module.exports = router;
