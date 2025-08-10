const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const headers = require("./API/Authentication/setHeaders");
const myWebsite = require("./API/Authentication/allowedSites");
const MySQLStore = require("express-mysql-session")(session);
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));

// Set headers
app.use(headers.setHeaders);

const corsOptions = {
  origin: myWebsite.url,
};
app.use(cors(corsOptions));

// MySQL pool configuration
const conn = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create MySQL connection pool
const pool = mysql.createPool(conn);
global.connection = pool.promise(); // For use with async/await (optional but cleaner)

// Session Store using MySQL pool
const sessionStore = new MySQLStore({}, pool); // Attach pool here

app.use(
  session({
    key: "userId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { httpOnly: false, secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);

// Test DB connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to MySQL database via pool");
    connection.release();
  }
});

// Import & Use Routes from App_routes.js
const routes = require("./API/Routes/App_routes");
app.use("/skill_assessment/api", routes);


// Home Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Skill Assessment API" });
});

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
