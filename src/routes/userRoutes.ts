// routes/userRoutes.ts

import express from "express";
import { getAvailableItems, bookOrder } from "../controllers/userController";

const router = express.Router();

router.get("/items", getAvailableItems);
router.post("/orders", bookOrder);

export default router;
