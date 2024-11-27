import pool from "../configs/dbConnect.js";
import BaseRepository from "./baseRepository.js";

class TypeRepository extends BaseRepository {
  constructor() {
    super(pool, "types");
  }
}

export default new TypeRepository();
