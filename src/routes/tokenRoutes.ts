import express from "express";
import {
  createToken,
} from "../controllers/userController";
import { API_ENDPOINTS } from "../constant";

const router = express.Router();

router.post(API_ENDPOINTS.CREATE_TOKEN, createToken);

export default router;
