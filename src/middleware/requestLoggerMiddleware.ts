import { Request, Response, NextFunction } from "express";
import fs from "fs";

const logFilePath = "request_logs.txt"; 

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("============= REQUEST ===================");
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("=========================================");

  const logStream = fs.createWriteStream(logFilePath, { flags: "a" });
  logStream.write("============= REQUEST ===================\n");
  logStream.write(`[${new Date().toISOString()}] ${req.method} ${req.url}\n`);
  logStream.write("=========================================\n");

  const originalSend = res.send;
  const originalJson = res.json;

  res.send = function (this: any, body: any) {
    return originalSend.call(this, body);
  };

  res.json = function (this: any, body: any) {
    console.log("============= RESPONSE ===================");
    console.log(`[${new Date().toISOString()}]`, body);
    console.log("=========================================");

    logStream.write("============= RESPONSE ===================\n");
    logStream.write(`[${new Date().toISOString()}] ${JSON.stringify(body)}\n`);
    logStream.write("=========================================\n");

    return originalJson.call(this, body);
  };

  next();
};
