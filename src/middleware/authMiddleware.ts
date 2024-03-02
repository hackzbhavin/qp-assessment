import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendFailureResponse } from "../helpers/apiResponses";
import {
    API,
  API_ENDPOINTS,
  API_KEY,
  API_MESSAGES,
  HTTP_STATUS_CODES,
} from "../constant";

// Define a custom interface that extends Request
interface AuthenticatedRequest extends Request {
  user?: any; // Define the 'user' property
}

const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader: any = req.header("Authorization");

  console.log(authHeader);

  if (req?.originalUrl == API + API_ENDPOINTS?.CREATE_TOKEN) {
    console.log("============req?.originalUrl========================");
    console.log(req?.originalUrl);
    console.log("====================================");
    return next();
  }

  // Check if Authorization header is present and has a token
  if (!authHeader || !authHeader.includes(" ")) {
    sendFailureResponse({
      res: res,
      data: null,
      message: API_MESSAGES.NOT_AUTH,
      statusCode: HTTP_STATUS_CODES?.UNAUTHORIZED,
    });
    return;
  }

  const [bearer, token] = authHeader.split(" ");

  if (!token) {
    sendFailureResponse({
      res: res,
      data: null,
      message: API_MESSAGES.NOT_AUTH,
      statusCode: HTTP_STATUS_CODES?.UNAUTHORIZED,
    });
    return;
  }

  jwt.verify(token, API_KEY?.SECRET, (err: any, user: any) => {
    if (err) {
      console.log(err);
      sendFailureResponse({
        res: res,
        data: err,
        message: API_MESSAGES.FORBIDDEN,
        statusCode: HTTP_STATUS_CODES?.FORBIDDEN,
      });
      // Do not proceed to call next() after sending a response
      return;
    }

    req.user = user;
    next();
  });
};

export { authenticateToken };