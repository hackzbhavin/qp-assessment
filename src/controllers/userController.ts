// userController.ts

import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";

const userModel = new UserModel();

export const getAvailableItems = async (req: Request, res: Response) => {
  try {
    userModel.getAvailableItems((error, availableItems) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: "Failed to retrieve available items",
          error: (error as Error).message,
        });
        return;
      }
      res.status(200).json({ success: true, data: availableItems });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve available items",
      error: (error as Error).message,
    });
  }
};

export const bookOrder = async (req: Request, res: Response) => {
  const { items } = req.body;

  try {
    // Assume userId is 1 for simplicity
    const userId = 1;

    userModel.bookOrder(userId, items, (error) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: "Failed to place order",
          error: (error as Error).message,
        });
        return;
      }
      res
        .status(201)
        .json({ success: true, message: "Order placed successfully" });
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: (error as Error).message,
    });
  }
};
