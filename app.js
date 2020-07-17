const express = require("express");
const app = express();
const path = require("path");

// Set up file path
app.use("/public", express.static("public"));

// Page Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/pages/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/pages/register.html"));
});

app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/pages/menu.html"));
});

app.get("/orders", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/pages/orders.html"));
});

app.get("/invoice", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/pages/invoice.html"));
});

app.get("/account", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/pages/account.html"));
});

app.listen(8080);
