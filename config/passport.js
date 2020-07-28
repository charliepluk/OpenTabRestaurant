const LocalStrategy = require("passport-local").Strategy;
const db = require("../config/databaseConnection");
const bcrypt = require("bcryptjs");

module.exports = function (passport) {
  // Used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  // Used to deserialize user
  passport.deserializeUser(function (user, done) {
    db.query(
      "SELECT * FROM restaurants WHERE restID = ?",
      [user.restID],
      function (err, rows) {
        if (err) {
          console.log(err);
        } else if (!rows.length) {
          console.log("No query found");
        } else {
          done(err, rows[0]);
        }
      }
    );
  });

  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "restPassword",
        passReqToCallback: true,
      },
      function (req, email, restPassword, done) {
        console.log("Querying DB");
        // find user with matching email
        db.query(
          "SELECT * FROM restaurants WHERE email = ?",
          [email],
          (err, rows) => {
            if (err) {
              console.log(err);
              return done(err);
            }

            // No User Found
            if (!rows.length) {
              console.log("No User Found.");
              return done(null, false, {
                message: "No User Found. Try Again.",
              });
            }

            // Compare password
            bcrypt.compare(restPassword, rows[0].restPassword, function (
              err,
              isMatch
            ) {
              if (err) throw err;
              if (isMatch) {
                console.log("Successful Login");
                return done(null, rows[0]);
              } else {
                console.log("Wrong Password.");
                return (
                  done(null, false),
                  {
                    message: "Wrong Password.",
                  }
                );
              }
            });
          }
        );
      }
    )
  );
};
