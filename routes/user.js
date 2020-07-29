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
  const {
    firstName,
    lastName,
    restName,
    email,
    phone,
    address,
    city,
    state,
    zipcode,
    restPassword,
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
    "SELECT email FROM restaurants WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("register", {
          message: "That email is already in use",
        });
      } else if (restPassword !== passwordConfirm) {
        return res.render("register", {
          message: "Passwords do not match",
        });
      }

      // Default Open and Close Times
      var openTime = "18:00:00";
      var closeTime = "01:00:00";

      // Hash the password before inserting to DB
      let hashedPassword = await bcrypt.hash(restPassword, 8);

      db.query(
        "INSERT INTO restaurants SET ?",
        {
          firstName: firstName,
          lastName: lastName,
          restName: restName,
          email: email,
          phone: phone,
          address: address,
          city: city,
          state: state,
          zipcode: zipcode,
          openTime: openTime,
          closeTime: closeTime,
          restPassword: hashedPassword,
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
  res.redirect("/users/login");
});

module.exports = router;
