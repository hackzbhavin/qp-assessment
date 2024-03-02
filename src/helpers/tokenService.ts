
import jwt from "jsonwebtoken";
import { API_KEY } from "../constant";


export const generateToken = (secret: string): string => {
  return jwt.sign({ secret }, API_KEY.SECRET, { expiresIn: "1h" });
};
