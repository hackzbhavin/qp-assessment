// routes/userRoutes.ts

import express from "express";
import { getAvailableItems, bookGroceryOrder } from "../controllers/userController";

const router = express.Router();

router.get("/items", getAvailableItems);
router.post("/orders/book", bookGroceryOrder);

export default router;
