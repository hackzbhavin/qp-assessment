// routes/adminRoutes.ts

import express from "express";
import {
  addNewItem,
  getExistingItems,
  removeItem,
  updateItem,
  manageInventory,
} from "../controllers/adminController";

const router = express.Router();

router.post("/items/add", addNewItem);
router.get("/items", getExistingItems);
router.delete("/items/delete/:itemId", removeItem);
router.put("/items/update/:itemId", updateItem);
router.put("/items/:itemId/inventory", manageInventory);

export default router;
