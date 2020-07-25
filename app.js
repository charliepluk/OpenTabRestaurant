const express = require("express");
const mysqlConnection = require("./databaseConnection");
const path = require("path");

const app = express();

// Set up static files
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL Encoded bodies
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(express.json());

// Set Node View Engine to Handlebars
app.set("view engine", "hbs");

// Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(8080);
