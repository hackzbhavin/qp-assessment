import { Request, Response } from "express";
import { ItemModel } from "../models/ItemModel";
import {
  sendFailureResponse,
  sendSuccessResponse,
} from "../helpers/apiResponses";
import { API_MESSAGES, HTTP_STATUS_CODES } from "../constant";

const itemModel = new ItemModel();
const adminId = 1;


// =================================================================
// ADD NEW ITEM 
// =================================================================
export const addNewItem = async (req: Request, res: Response) => {
  try {
    itemModel.addNewItem(req.body, adminId, (error, newItem) => {
      if (error) {
        sendFailureResponse({
          res: res,
          message: API_MESSAGES.FAILED_TO_ADD_ITEM,
          statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          error: error,
        });

        return;
      }
      sendSuccessResponse({
        res: res,
        message: API_MESSAGES.ITEM_ADDED_SUCCESSFULLY,
        data: newItem,
        statusCode: HTTP_STATUS_CODES.CREATED,
      });
    });
  } catch (error) {
    sendFailureResponse({
      res: res,
      message: API_MESSAGES.FAILED_TO_ADD_ITEM,
      error: error,
      statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    });
  }
};

// =================================================================
// GET EXISTING ITEMS
// =================================================================
export const getExistingItems = async (req: Request, res: Response) => {
  try {
    itemModel.getExistingItems((error, existingItems) => {
      if (error) {
        sendFailureResponse({
          res: res,
          message: API_MESSAGES.FAILED_TO_FETCH_ITEMS,
          error: error,
          statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        });
        return;
      }
      sendSuccessResponse({
        res: res,
        message: API_MESSAGES?.DATA_FETCHED_SUCCESSFULLY,
        data: existingItems,
      });
    });
  } catch (error) {
    if (error) {
      sendFailureResponse({
        res: res,
        message: API_MESSAGES.FAILED_TO_FETCH_ITEMS,
        error: error,
        statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    }
  }
};

// =================================================================
// REMOVE ITEM
// =================================================================
export const removeItem = async (req: Request, res: Response) => {
  const itemId = String(req.params.itemId);

  try {
    itemModel.removeItem(itemId, adminId, (error) => {
      if (error) {
        sendFailureResponse({
          res: res,
          message: API_MESSAGES?.FAILED_TO_REMOVE_ITEM,
          statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
          error: { error: error },
        });
        return;
      }

      sendSuccessResponse({
        res: res,
        message: API_MESSAGES.ITEM_REMOVED_SUCCESSFULLY,
        data: {},
        statusCode: HTTP_STATUS_CODES.OK,
      });
    });
  } catch (error) {
    sendFailureResponse({
      res: res,
      message: API_MESSAGES?.FAILED_TO_REMOVE_ITEM,
      statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
      error: { error: error },
    });
  }
};

// =================================================================
// UPDATE ITEM
// =================================================================
export const updateItem = async (req: Request, res: Response) => {
  const itemId = String(req.params.itemId);
  try {
    itemModel.updateItem(itemId, req.body, adminId, (error, updatedItem) => {
      if (error) {
        sendFailureResponse({
          res: res,
          message: API_MESSAGES?.FAILED_TO_UPDATE_ITEM,
          statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
          error: { error: error },
        });
        return;
      }
      sendSuccessResponse({
        res: res,
        message: API_MESSAGES?.ITEM_UPDATED_SUCCESSFULLY,
        statusCode: HTTP_STATUS_CODES?.OK,
        data: updatedItem,
      });
    });
  } catch (error) {
    sendFailureResponse({
      res: res,
      message: API_MESSAGES?.FAILED_TO_UPDATE_ITEM,
      statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
      error: { error: error },
    });
  }
};


// =================================================================
// MANAGE INVENTORY ITEM
// =================================================================
export const manageInventory = async (req: Request, res: Response) => {
  const itemId = String(req.params.itemId);
  const { action, amount } = req.body;
  try {
    itemModel.manageInventory(
      itemId,
      action,
      amount,
      (error, updatedInventory) => {
        if (error) {
          sendFailureResponse({
            res: res,
            message: API_MESSAGES?.FAILED_TO_MANAGE_INVENTORY,
            statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
            error: { error: error },
          });

          return;
        }

        sendSuccessResponse({
          res: res,
          message: API_MESSAGES?.INVENTORY_MANAGED_SUCCESSFULLY,
          statusCode: HTTP_STATUS_CODES?.OK,
          data: updatedInventory,
        });
      }
    );
  } catch (error) {
    sendFailureResponse({
      res: res,
      message: API_MESSAGES?.FAILED_TO_MANAGE_INVENTORY,
      statusCode: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
      error: { error: error },
    });
  }
};
