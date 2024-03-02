import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import {
  sendFailureResponse,
  sendSuccessResponse,
} from "../helpers/apiResponses";
import { API_KEY, API_MESSAGES, HTTP_STATUS_CODES } from "../constant";
import { generateToken } from "../helpers/tokenService";

const userModel = new UserModel();
const userId = 1;


// =================================================================
// GET ALL ITEMS API
// =================================================================
export const getAvailableItems = async (req: Request, res: Response) => {
  try {
    userModel.getAvailableItems((error, availableItems) => {
      if (error) {
        sendFailureResponse({
          res: res,
          message: API_MESSAGES?.FAILED_TO_FETCH_ITEMS,
          statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
          error: { error: error },
        });
        return;
      }
      sendSuccessResponse({
        res: res,
        message: API_MESSAGES?.DATA_FETCHED_SUCCESSFULLY,
        statusCode: HTTP_STATUS_CODES?.OK,
        data: availableItems,
      });
    });
  } catch (error) {
    sendFailureResponse({
      res: res,
      message: API_MESSAGES?.FAILED_TO_FETCH_ITEMS,
      statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
      error: { error: error },
    });
  }
};


// =================================================================
// BOOK GROCERY ORDER API
// =================================================================
export const bookGroceryOrder = async (req: Request, res: Response) => {
  const { itemDetails } = req.body;

  try {
    userModel.bookGroceryItems(userId, itemDetails, (error) => {
      if (error) {
        sendFailureResponse({
          res: res,
          message: API_MESSAGES?.FAILED_TO_BOOK_ORDER,
          statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
          error: { error: error },
        });
        return;
      }

      sendSuccessResponse({
        res: res,
        message: API_MESSAGES?.BOOKED_ORDER,
        statusCode: HTTP_STATUS_CODES?.CREATED,
        data: {},
      });
    });
  } catch (error) {
    sendFailureResponse({
      res: res,
      message: API_MESSAGES?.FAILED_TO_BOOK_ORDER,
      statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
      error: { error: error },
    });
  }
};


// =================================================================
// GET ALL ORDERS API
// =================================================================
export const getOrderHistory = async (req: Request, res: Response) => {
  try {
    userModel.getOrderHistory(userId,(error, availableItems) => {
      if (error) {
        sendFailureResponse({
          res: res,
          message: API_MESSAGES?.FAILED_TO_FETCH_ITEMS,
          statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
          error: { error: error },
        });
        return;
      }
      sendSuccessResponse({
        res: res,
        message: API_MESSAGES?.DATA_FETCHED_SUCCESSFULLY,
        statusCode: HTTP_STATUS_CODES?.OK,
        data: availableItems,
      });
    });
  } catch (error) {
    sendFailureResponse({
      res: res,
      message: API_MESSAGES?.FAILED_TO_FETCH_ITEMS,
      statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
      error: { error: error },
    });
  }
};


// =================================================================
// Route for generating a token
// =================================================================
export const createToken = async (req: Request, res: Response) => {

  const { secret } = req.body;
  console.log("==============secret======================");
  console.log(req);
  console.log('====================================');

  if (!secret || API_KEY?.SECRET !== secret) {
    sendFailureResponse({
      res: res,
      message: API_MESSAGES?.INVALID_ACTION,
      statusCode: HTTP_STATUS_CODES?.BAD_REQUEST,
    });
  }

  const token = generateToken(secret);
  sendSuccessResponse({
    res: res,
    message: API_MESSAGES?.SUCCESS,
    data:{token:token},
    statusCode: HTTP_STATUS_CODES?.OK,
  });
 
  return true
}