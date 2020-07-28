var db = require("../config/databaseConnection");
var express = require("express");
var router = express.Router();

// Get the Menu Page
router.get("/", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/users/login");
  } else {
    res.render("menu");
  }
});

// INSERT NEW MENU ITEM
router.post("/insert", (req, res) => {
  console.log(req.body);
  const { itemName, itemPrice, itemDescription, itemType } = req.body;
  const restID = req.user.restID;

  if (itemDescription === null || itemDescription === undefined) {
    itemDescription = "";
  }

  db.query(
    "INSERT INTO items SET ?",
    {
      restID: restID,
      itemName: itemName,
      itemPrice: itemPrice,
      itemDescription: itemDescription,
      itemType: itemType,
    },
    (error, result) => {
      if (error) {
        console.log("Unable to add new menu item");
      } else {
        console.log("Added new menu item");
        res.render("menu");
      }
    }
  );
});

// DELETE MENU ITEM
router.post("/delete", function (req, res) {
  const { itemID } = req.body;

  db.query(`DELETE FROM items WHERE itemID = "${itemID}"`);
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
  console.log("Getting Menu Items");
  const restID = req.user.restID;

  db.query(`SELECT * FROM items  WHERE restID = "${restID}"`, function (
    err,
    result,
    fields
  ) {
    String(result);
    res.send(result);
  });
});

module.exports = router;