import express from "express";
import {
  addNewItem,
  getExistingItems,
  removeItem,
  updateItem,
  manageInventory,
} from "../controllers/adminController";
import { API_ENDPOINTS } from "../constant";

const router = express.Router();

router.post(API_ENDPOINTS.ADMIN_ADD_ITEM, addNewItem);
router.get(API_ENDPOINTS.ADMIN_GET_ITEMS, getExistingItems);
router.delete(API_ENDPOINTS.ADMIN_DELETE_ITEM, removeItem);
router.put(API_ENDPOINTS.ADMIN_UPDATE_ITEM, updateItem);
router.put(API_ENDPOINTS.ADMIN_MANAGE_INVENTORY, manageInventory);

export default router;
