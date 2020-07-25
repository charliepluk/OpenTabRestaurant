const db = require("../config/databaseConnection");
const bcrypt = require("bcryptjs");
const express = require("express");
const passport = require("passport");
const router = express.Router();

// Register Form
router.get("/register", (req, res) => {
  res.render("register");
});

// Register Process
router.post("/register", (req, res) => {
  console.log(req.body);

  const {
    firstName,
    lastName,
    restaurantName,
    email,
    phone,
    address,
    zipcode,
    state,
    password,
    passwordConfirm,
  } = req.body;

  empyItem = false;
  for (const item in req.body) {
    if (req.body[item].length === 0) {
      empyItem = true;
      break;
    }
  }

  if (empyItem) {
    return res.render("register", {
      message: "Please fill out all fields",
    });
  }

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("register", {
          message: "That email is already in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Passwords do not match",
        });
      }

      // Hash the password before inserting to DB
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users SET ?",
        {
          firstName: firstName,
          lastName: lastName,
          restaurantName: restaurantName,
          email: email,
          phone: phone,
          address: address,
          zipcode: zipcode,
          state: state,
          password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            res.redirect("/users/login");
          }
        }
      );
    }
  );
});

// Login Form
router.get("/login", (req, res) => {
  res.render("login");
});

// Login Process
router.post("/login", (req, res, next) => {
  console.log(req.body);
  console.log("Authenticating");
  passport.authenticate("local", {
    successRedirect: "/menu",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout Process
router.get("/logout", (req, res) => {
  req.logout();
  console.log("Logged Out.");
  res.redirect("/login");
});

module.exports = router;
