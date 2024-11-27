import pool from "../configs/dbConnect.js";
import BaseRepository from "./baseRepository.js";
import elasticClient from "../configs/elasticsearchConnect.js";

class ExpenseRepository extends BaseRepository {
  constructor() {
    super(pool, "expenses");
  }

  async syncToElastic() {
    try {
      const expenses = await this.selectAll();
      for (const expense of expenses) {
        await elasticClient.index({
          index: "expenses",
          id: expense.id,
          body: expense,
        });
      }
      return {
        success: true,
        message: "Data synced to Elasticsearch successfully",
      };
    } catch (error) {
      throw new Error(`Error syncing to Elasticsearch: ${error.message}`);
    }
  }

  addToElasticsearch = async (expense) => {
    try {
      const result = await elasticClient.index({
        index: "expenses", // Tên chỉ mục trong Elasticsearch
        document: expense, // Dữ liệu cần thêm
      });
      return result;
    } catch (error) {
      throw new Error(`Error adding to Elasticsearch: ${error.message}`);
    }
  };

  searchInElasticsearch = async (query) => {
    try {
      const result = await elasticClient.search({
        index: "expenses",
        query: {
          match: { name: query }, // Thay đổi theo trường cần tìm kiếm
        },
      });
      return result.hits.hits.map((hit) => hit._source);
    } catch (error) {
      throw new Error(`Error searching in Elasticsearch: ${error.message}`);
    }
  };
}

export default new ExpenseRepository();
