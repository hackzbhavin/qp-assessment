import express from "express";
import {
  getAvailableItems,
  bookGroceryOrder,
  getOrderHistory,
} from "../controllers/userController";
import { API_ENDPOINTS } from "../constant";

const router = express.Router();

router.get(API_ENDPOINTS.GET_ITEMS, getAvailableItems);
router.post(API_ENDPOINTS.ADD_ORDER, bookGroceryOrder);
router.get(API_ENDPOINTS.GET_ORDERS_HISTORY, getOrderHistory);




export default router;
