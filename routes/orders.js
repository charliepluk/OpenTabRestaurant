var db = require("../config/databaseConnection");
var express = require("express");
var router = express.Router();

// Get the orders Page
router.get("/", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/users/login");
  } else {
    res.render("orders");
  }
});

// UPDATE ORDER
router.post("/update", function (req, res) {
  console.log(req.body);
  const { orderID, orderStatus } = req.body;

  db.query(
    `UPDATE orders SET ? WHERE orderID="${orderID}"`,
    {
      orderStatus: orderStatus,
    },
    (err, result) => {
      if (err) {
        console.log("Unable to Update Order Status!");
        res.redirect("/menu");
      } else {
        console.log("Updated Orders!");
        res.redirect("/menu");
      }
    }
  );
});

// Query to get all items
router.get("/query", function (req, res) {
  console.log("Getting Orders");
  const restID = req.user.restID;

  db.query(
    `SELECT orders.orderID, orders.customerID, orders.orderNotes, orders.orderDateTime, orders.orderStatus, orders.orderItems, customers.customerFirstname
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
