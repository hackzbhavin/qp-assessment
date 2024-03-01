import { Request, Response, NextFunction } from "express";
import fs from "fs";

const logFilePath = "request_logs.txt"; // Path to the log file

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log request details to console
  console.log("============= REQUEST ===================");
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("=========================================");

  // Log request details to file
  const logStream = fs.createWriteStream(logFilePath, { flags: "a" });
  logStream.write("============= REQUEST ===================\n");
  logStream.write(`[${new Date().toISOString()}] ${req.method} ${req.url}\n`);
  logStream.write("=========================================\n");

  // Store original response.send and response.json methods
  const originalSend = res.send;
  const originalJson = res.json;

  // Override response.send method to log response
  res.send = function (this: any, body: any) {
    return originalSend.call(this, body);
  };

  // Override response.json method to log response
  res.json = function (this: any, body: any) {
    // Log response to console
    console.log("============= RESPONSE ===================");
    console.log(`[${new Date().toISOString()}]`, body);
    console.log("=========================================");

    // Log response to file
    logStream.write("============= RESPONSE ===================\n");
    logStream.write(`[${new Date().toISOString()}] ${JSON.stringify(body)}\n`);
    logStream.write("=========================================\n");

    return originalJson.call(this, body);
  };

  next();
};
