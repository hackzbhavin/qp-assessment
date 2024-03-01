import { Request, Response, NextFunction } from "express";
import { API_MESSAGES, HTTP_STATUS_CODES } from "../constant";
import { sendFailureResponse } from "../helpers/apiResponses";

export const handle404Error = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sendFailureResponse({
    res: res,
    message: API_MESSAGES?.NOT_FOUND,
    statusCode: HTTP_STATUS_CODES?.NOT_FOUND,
  });
};


export const handleGenericError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  sendFailureResponse({
    res: res,
    message: API_MESSAGES?.INTERNAL_SERVER_ERROR,
    statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
  });
};
