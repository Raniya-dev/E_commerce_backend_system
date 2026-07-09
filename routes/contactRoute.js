import express from "express";
import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const contactRouter = express.Router();

contactRouter.post("/", createContact);

contactRouter.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getContacts
);

export default contactRouter;