import jwt, { Secret } from "jsonwebtoken";
import { API_KEY } from "../constant";

export const generateToken = (secret: string): string => {
  return jwt.sign({ secret }, API_KEY.SECRET as Secret, { expiresIn: "1h" });
};
