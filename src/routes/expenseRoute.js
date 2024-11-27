import express from "express";
import validate from "../middlewares/validateMiddleware.js";
import expenseController from "../controllers/expenseController.js";
import {
  expenseCreateSchema,
  expenseUpdateSchema,
} from "../schemas/expenseSchema.js";

const router = express.Router();

router.post("/", validate(expenseCreateSchema), expenseController.postExpense);
router.get("/", expenseController.getExpenses);
router.get("/:id", expenseController.getExpense);
router.put("/:id", validate(expenseUpdateSchema), expenseController.putExpense);
router.get("/search", expenseController.getExpenses_es);
router.post("/sync", expenseController.syncExpenses);

export default router;
