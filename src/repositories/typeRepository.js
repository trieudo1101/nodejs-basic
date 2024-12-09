import db from "../models/index.js";
import BaseRepository from "./baseRepository.js";

class TypeRepository extends BaseRepository {
  constructor() {
    super(db.Type);
  }

  async selectAllTypes() {
    return await this.model.findAll();
  }
}

export default new TypeRepository();
