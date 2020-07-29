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
  const restID = req.user.restID;

  db.query(
    `SELECT orders.orderID, orders.customerID, orders.orderNotes, orders.orderDateTime, orders.orderStatus, orders.orderItems, orders.totalOrderPrice, customers.customerFirstname
    FROM orders 
    INNER JOIN customers 
    ON orders.customerID = customers.customerID
    WHERE restID = "${restID}" `,
    function (err, result, fields) {
      String(result);
      console.log(result);
      res.send(result);
    }
  );
});

module.exports = router;
