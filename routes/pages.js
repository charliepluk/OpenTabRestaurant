const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/menu", (req, res) => {
  res.render("menu");
});

router.get("/orders", (req, res) => {
  res.render("orders");
});

router.get("/invoice", (req, res) => {
  res.render("invoice");
});

router.get("/account", (req, res) => {
  res.render("account");
});

module.exports = router;
