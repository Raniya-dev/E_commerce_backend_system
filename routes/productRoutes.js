import express from "express";
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  filterProduct
} from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.get("/filter", filterProduct)
productRouter.get("/", getAllProduct)
productRouter.get("/:productId", getSingleProduct)

productRouter.post("/", authMiddleware, roleMiddleware("admin"), createProduct)
productRouter.put("/:productId", authMiddleware, roleMiddleware("admin"), updateProduct)
productRouter.delete("/:productId", authMiddleware, roleMiddleware("admin"), deleteProduct);

export default productRouter;
