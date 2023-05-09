const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bookRoutes = require("./src/routes/bookRoutes");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

// DB Connection
const db = require("./connection").con;

// Server
app.listen(port, (err) => {
  if (err) {
    console.log("Server Failed to start");
  } else {
    console.log("Server started at port: ", port);
  }
});

// Setting up Environment
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public", { type: "text/javascript" }));

// View Engine
app.set("view engine", "ejs");

// Making DB accessible to Router
app.use(function (req, res, next) {
  req.con = db;
  next();
});

// Routes
app.get("/", (req, res) => res.render("home"));
app.use("/book", bookRoutes);

module.exports = app;
