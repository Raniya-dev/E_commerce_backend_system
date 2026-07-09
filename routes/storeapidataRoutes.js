import express from "express";
import {storeapidata,getProducts,getSingleProduct} from "../controllers/storeapidataController.js"



const storeapidataRouter = express.Router();

storeapidataRouter.post("/storeapidata", storeapidata);
storeapidataRouter.get("/getstoredproducts", getProducts);

storeapidataRouter.get("/getstoredproducts/:id", getSingleProduct);
export default storeapidataRouter;