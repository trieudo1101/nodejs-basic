import express from "express";
import validate from "../middlewares/validateMiddleware.js";
import { getTypes, postType } from "../controllers/typeController.js";
import { typeCreateSchema } from "../schemas/typeSchema.js";

const router = express.Router();

const typeRoutes = (app) => {
  router.post("/post-type", validate(typeCreateSchema), postType);

  return app.use("/types", router);
};

export default typeRoutes;
