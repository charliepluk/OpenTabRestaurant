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

  const fixedItemPrice = parseFloat(itemPrice).toFixed(2);

  if (itemDescription === null || itemDescription === undefined) {
    itemDescription = "";
  }

  db.query(
    "INSERT INTO items SET ?",
    {
      restID: restID,
      itemName: itemName,
      itemPrice: fixedItemPrice,
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
  console.log("Deleting Menu Item");
  const { itemID } = req.body;

  db.query(`DELETE FROM items WHERE itemID = "${itemID}"`, (err, result) => {
    if (err) {
      console.log("Unable to Delete Item");
      res.redirect("/menu");
    } else {
      console.log("Deleted Item");
      res.redirect("/menu");
    }
  });
});

// UPDATE MENU ITEM
router.post("/update", function (req, res) {
  console.log(req.body);
  var { itemID, itemName, itemPrice, itemDescription } = req.body;
  const fixedItemPrice = parseFloat(itemPrice).toFixed(2);

  if (itemDescription === "") {
    itemDescription = null;
  }

  db.query(
    `UPDATE items SET ? WHERE itemID="${itemID}"`,
    {
      itemName: itemName,
      itemPrice: fixedItemPrice,
      itemDescription: itemDescription,
    },
    (err, result) => {
      if (err) {
        console.log("Unable to Update Item!");
        res.redirect("/menu");
      } else {
        console.log("Updated Item!");
        res.redirect("/menu");
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
