import db from "../models/index.js";
import BaseRepository from "./baseRepository.js";

class ExpenseRepository extends BaseRepository {
  constructor() {
    super(db.Expense);
  }

  async selectDetailExpense(id) {
    const record = await this.model.findByPk(id, {
      include: [
        {
          model: db.Category,
          attributes: ["id", "categoryName"],
        },
        {
          model: db.Type,
          attributes: ["id", "typeName"],
        },
      ],
    });
    return record || null;
  }

  async selectExpenses(currentPage = 1, pageSize = 10) {
    const offset = (currentPage - 1) * pageSize;
    const limit = pageSize;
    const totalRecord = await this.model.count();
    const records = await this.model.findAll({
      offset: offset,
      limit: limit,
      include: [
        {
          model: db.Category,
          attributes: ["id", "categoryName"],
        },
        {
          model: db.Type,
          attributes: ["id", "typeName"],
        },
      ],
    });
    const totalPages = Math.ceil(totalRecord / pageSize);
    return {
      data: records,
      pagination: {
        currentPage,
        pageSize,
        totalRecord,
        totalPages,
      },
    };
  }
}

export default new ExpenseRepository();
