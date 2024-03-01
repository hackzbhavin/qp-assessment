import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./src/routes/adminRoutes";
import userRoutes from "./src/routes/userRoutes";
import { handle404Error, handleGenericError } from "./src/middleware/errorMiddleware";
import { requestLoggerMiddleware } from "./src/middleware/requestLoggerMiddleware";
import mysql, { MysqlError } from "mysql"; // Import mysql and MysqlError types

const app = express();
const dbConfig = require("./src/config/dbConfig");

app.use(bodyParser.json());

const connection = mysql.createConnection(dbConfig);

connection.connect((err: MysqlError) => {
  // Specify the type of 'err' as MysqlError
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// =================================================================
// Routes
// =================================================================
app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes);


// =================================================================
// Middleware for logging every request
// =================================================================
app.use(requestLoggerMiddleware);

// =================================================================
// 404 Error Middleware
// =================================================================
app.use(handle404Error);

// =================================================================
// Error handling middleware
// =================================================================
app.use(handleGenericError);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
