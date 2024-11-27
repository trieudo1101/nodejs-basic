import express from "express";
import validate from "../middlewares/validateMiddleware.js";
import typeController from "../controllers/typeController.js";
import { typeCreateSchema } from "../schemas/typeSchema.js";

const router = express.Router();

router.post("/", validate(typeCreateSchema), typeController.postType);

export default router;
