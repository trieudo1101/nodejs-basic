import expenseRepository from "../repositories/expenseRepository.js";
import FailedResponse from "../models/enumResponse.js";
import client from "../configs/elasticsearchConnect.js";

class ExpenseService {
  createExpense = async (expenseData) => {
    const newExpense = await expenseRepository.insert(expenseData);
    await expenseRepository.addToElasticsearch(newExpense);
    return newExpense;
  };

  getExpenseById = async (id) => {
    const expense = await expenseRepository.selectById(id);
    if (!expense) {
      return FailedResponse.NOT_FOUND;
    }
    return expense;
  };

  getExpenses = async () => {
    const expenses = await expenseRepository.selectAll();
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

  getExpenses_es = async () => {
    const { body } = await client.search({
      index: "expenses",
      query: { match_all: {} },
    });
    return body.hits.hits.map((hit) => hit._source);
  };

  syncExpenses = async () => {
    return await expenseRepository.syncToElastic(); // Gọi hàm đồng bộ
  };
}

export default new ExpenseService();
