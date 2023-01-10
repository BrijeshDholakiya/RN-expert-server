const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
// const { MongoClient } = require("mongodb");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
// const logger = require("./middlewares/loggers");

// configuring the env
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

// import routes
const Service = require("./routes/services");
const Project = require("./routes/projects");
const Upload = require("./routes/upload");
const User = require("./routes/users");
const Inquiry = require("./routes/inquiries");
const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// app.use(logger);
app.use(fileupload());

// static paths
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/services", Service);
app.use("/api/v1/projects", Project);
app.use("/api/v1/upload", Upload);
app.use("/api/v1/user", User);
app.use("/api/v1/inquiry", Inquiry);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

// Server code
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //  Close server and exit process
  server.close(() => process.exit(1));
});
