import expenseService from "../services/expenseService.js";
import FailedResponse from "../models/enumResponse.js";

class ExpenseController {
  postExpense = async (req, res, next) => {
    try {
      const result = await expenseService.createExpense(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  getExpense = async (req, res, next) => {
    try {
      const result = await expenseService.getExpenseById(req.params.id);
      if (result === FailedResponse.NOT_FOUND) {
        return res.status(404).json({ message: FailedResponse.NOT_FOUND });
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getExpenses = async (req, res, next) => {
    try {
      const result = await expenseService.getExpenses();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  putExpense = async (req, res, next) => {
    try {
      const result = await expenseService.updateExpense(
        req.params.id,
        req.body
      );

      if (result === FailedResponse.NOT_FOUND) {
        return res.status(404).json({ message: FailedResponse.NOT_FOUND });
      }

      if (result === FailedResponse.UPDATE_FAILED) {
        return res.status(400).json({ message: FailedResponse.UPDATE_FAILED });
      }

      return res.status(200).json({
        message: "Expense updated successfully",
        affectedRows: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteExpense = async (req, res, next) => {
    try {
      const result = await expenseService.deleteExpense(req.params.id);
      if (result === FailedResponse.NOT_FOUND) {
        return res.status(404).json({ message: FailedResponse.NOT_FOUND });
      }

      if (result === FailedResponse.DELETE_FAILED) {
        return res.status(400).json({ message: FailedResponse.DELETE_FAILED });
      }

      return res.status(200).json({
        message: "Expense deleted successfully",
        affectedRows: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getExpenses_es = async (req, res, next) => {
    try {
      const result = await expenseService.getExpenses_es();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  syncExpenses = async (req, res, next) => {
    try {
      const result = await expenseService.syncExpenses();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default new ExpenseController();
