import expenseRepository from "../repositories/expenseRepository.js";
import FailedResponse from "../utils/enumResponse.js";

class ExpenseService {
  createExpense = async (expenseData) => {
    const newExpense = await expenseRepository.insert(expenseData);
    return newExpense;
  };

  getExpenseById = async (id) => {
    const expense = await expenseRepository.selectDetailExpense(id);
    if (!expense) {
      return FailedResponse.NOT_FOUND;
    }
    return expense;
  };

  getExpenses = async (currentPage, pageSize) => {
    const page = parseInt(currentPage, 10) || 1;
    const size = parseInt(pageSize, 10) > 0 ? parseInt(pageSize, 10) : 10;
    const expenses = await expenseRepository.selectExpenses(page, size);
    return expenses;
  };

  updateExpense = async (id, expenseUpdateData) => {
    const existingExpense = await expenseRepository.selectById(id);
    if (!existingExpense) {
      return FailedResponse.NOT_FOUND;
    }

    const filteredData = Object.fromEntries(
      Object.entries(expenseUpdateData).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    const affectedRows = await expenseRepository.update(id, filteredData);
    if (affectedRows === 0) {
      return FailedResponse.UPDATE_FAILED;
    }
    return affectedRows;
  };

  deleteExpense = async (id) => {
    const expense = await expenseRepository.selectById(id);
    if (!expense) {
      return FailedResponse.NOT_FOUND;
    }

    const affectedRows = await expenseRepository.delete(id);
    if (affectedRows === 0) {
      return FailedResponse.DELETE_FAILED;
    }
    return affectedRows;
  };
}

export default new ExpenseService();
