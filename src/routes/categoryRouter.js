import express from "express";
import validate from "../middlewares/validateMiddleware.js";
import { categoryCreateSchema } from "../schemas/categorySchema.js";
import {
  postCategory,
  getCategory,
  getCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

const categoryRouters = (app) => {
  router.post("/post-category", validate(categoryCreateSchema), postCategory);

  return app.use("/categories", router);
};

export default categoryRouters;
