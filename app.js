const express = require("express");
const mysqlConnection = require("./config/databaseConnection");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const path = require("path");
const app = express();

// Set up static files
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL Encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

app.use(flash());

// Session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Set Node View Engine to Handlebars
app.set("view engine", "hbs");

// Passport Config
require("./config/passport")(passport);

// Initialize Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("*", function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Define Routes
app.use("/", require("./routes/pages"));
app.use("/users", require("./routes/user"));
app.use("/menu", require("./routes/menu"));
app.use("/invoice", require("./routes/invoice"));
app.use("/customer", require("./routes/customer"));
app.use("/account", require("./routes/account"));

app.listen(8080, () => {
  console.log("Listening on Port 8080.");
});
