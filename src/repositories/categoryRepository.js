import BaseRepository from "./baseRepository.js";
import db from "../models/index.js";

class CategoryRepository extends BaseRepository {
  constructor() {
    super(db.Category);
  }

  async selectAllCategories() {
    return await this.model.findAll();
  }
}

export default new CategoryRepository();
