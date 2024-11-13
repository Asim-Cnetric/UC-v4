require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const corsMiddleware = require("./utils/cors");
const routes = require("./routes");
const startServer = require("./server");
const path = require("path");

const app = express();

// Middleware for secure HTTP headers
app.use(helmet());

// CORS middleware to allow requests from different origins
app.use(corsMiddleware());

// Compression middleware for better performance
app.use(compression());

//Serving  static files
app.use("/assets", express.static(path.join(__dirname, "assets")));

// HTTP request logger
app.use(morgan("dev"));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Body parser middleware for parsing JSON request bodies
app.use(express.json());

// Use app routes
app.use("/api/uc/v4", routes);

//Not Found  Middleware
app.use((req, res, next) => {
  res.status(404).send({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send({ message: "Something went wrong!", error: err.message });
});

// Start the server
startServer(app);