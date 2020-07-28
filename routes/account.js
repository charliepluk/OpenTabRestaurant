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

// UPDATE MENU ITEM
router.post("/update", function (req, res) {
  console.log(req.body);
  const { itemID, itemName, itemPrice, itemDescription, itemType } = req.body;

  db.query(
    `UPDATE items SET ? WHERE itemID="${itemID}"`,
    {
      itemName: itemName,
      itemPrice: itemPrice,
      itemDescription: itemDescription,
      itemType: itemType,
    },
    (err, result) => {
      if (err) {
        console.log("Unable to Update Item!");
        res.render("menu");
      } else {
        console.log("Updated Item!");
        res.render("menu");
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
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
