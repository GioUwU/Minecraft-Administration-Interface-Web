const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const session = require("express-session");
const path = require("path");

require("./db.js");


const server = express();
const cors = require("cors");


server.name = "API";

server.use(
  session({
    secret: " ",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, expires: new Date(253402300000000) },
  })
);

//config ejs
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, "views")));
server.use(cookieParser());

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  //urls permitidas: http://localhost:3000, http://localhost:3001, http://localhost:3002, http://localhost:3003
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  //permitir multipart/form-data
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
