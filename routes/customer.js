var db = require("../config/databaseConnection");
var express = require("express");
var router = express.Router();

// Query to get all items
router.get("/query", function (req, res) {
  console.log("Getting Customer Info");
  const { customerID } = req.body;

  db.query(
    `SELECT * FROM customers  WHERE customerID = "${customerID}"`,
    function (err, result, fields) {
      String(result);
      console.log(result);
      res.send(result);
    }
  );
});

module.exports = router;
