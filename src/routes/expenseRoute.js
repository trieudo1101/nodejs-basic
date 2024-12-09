import express from "express";
import validate from "../middlewares/validateMiddleware.js";
import {
  routeToCreateExpense,
  postExpense,
  getExpenseById,
  getExpenses,
  putExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import {
  expenseCreateSchema,
  expenseUpdateSchema,
} from "../schemas/expenseSchema.js";

const router = express.Router();

const expenseRoutes = (app) => {
  // router.put('/:id', validate(expenseUpdateSchema), putExpense);
  //Navigate
  router.get("/expense-create", routeToCreateExpense);

  //Action
  router.post("/post-expense", validate(expenseCreateSchema), postExpense);
  router.post("/put-expense", validate(expenseUpdateSchema), putExpense);

  //Render
  router.get("/", getExpenses);
  router.get("/:id", getExpenseById);

  return app.use("/expenses", router);
};

export default expenseRoutes;
