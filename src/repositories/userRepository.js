import BaseRepository from "./baseRepository.js";
import db from "../models/index.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(db.User);
  }
}

export default new UserRepository();
