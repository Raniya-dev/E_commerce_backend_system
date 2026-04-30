import express from "express";
import { getRecommendedProducts } from "../controllers/analyticsController.js";
import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"


const analyticRouter = express.Router()

analyticRouter.get("/", authMiddleware,roleMiddleware("user"), getRecommendedProducts)

export default analyticRouter;
