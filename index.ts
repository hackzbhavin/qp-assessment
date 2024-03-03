require("dotenv").config();

import bodyParser from "body-parser";
import adminRoutes from "./src/routes/adminRoutes";
import userRoutes from "./src/routes/userRoutes";
import tokenRoutes from "./src/routes/tokenRoutes";
import {
  handle404Error,
  handleGenericError,
} from "./src/middleware/errorMiddleware";
import { requestLoggerMiddleware } from "./src/middleware/requestLoggerMiddleware";
import mysql, { MysqlError } from "mysql";
import { authenticateToken } from "./src/middleware/authMiddleware";
import { generateToken } from "./src/helpers/tokenService";
import express, { Request, Response } from "express";
import {
  ADMIN_API,
  API,
  API_ENDPOINTS,
  API_KEY,
  API_MESSAGES,
  Config,
  HTTP_STATUS_CODES,
} from "./src/constant";
import { sendFailureResponse } from "./src/helpers/apiResponses";

const app = express();
const dbConfig = require("./src/config/dbConfig");

app.use(bodyParser.json());

const connection = mysql.createConnection(dbConfig);

connection.connect((err: MysqlError) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// =================================================================
// Middleware for logging
// =================================================================
app.use(requestLoggerMiddleware);

// =================================================================
// Apply Token Authentication Middleware
// =================================================================
app.use(authenticateToken);

// =================================================================
// Routes
// =================================================================

// Protected Admin Routes
app.use(ADMIN_API, adminRoutes);

// Protected User Routes
app.use(API, userRoutes);

app.use(API, tokenRoutes);

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
