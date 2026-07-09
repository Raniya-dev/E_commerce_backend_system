import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  addToCart,
  getCart,
  removeCartItem,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware(), addToCart);

cartRouter.get("/", authMiddleware(), getCart);

cartRouter.delete("/:id", authMiddleware(), removeCartItem);

export default cartRouter;