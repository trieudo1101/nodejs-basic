import pool from "../configs/dbConnect.js";
import BaseRepository from "./baseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(pool, "users");
  }
  // insertUser = async (user) => {
  //     try {
  //         const { name, email, password } = user;
  //         const result = await pool.query(
  //             'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
  //             [name, email, password]
  //         );
  //         return result[0];
  //     } catch (error) {
  //         throw new Error('Error creating user: ' + error.message);
  //     }
  // }

  // selectUserById = async (id) => {
  //     try {
  //         const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  //         return rows[0];
  //     } catch (error) {
  //         throw new Error('Error fetching user: ' + error.message);
  //     }
  // }

  // selectAllUsers = async () => {
  //     try {
  //         const [rows] = await pool.query('SELECT * FROM users');
  //         return rows;
  //     } catch (error) {
  //         throw new Error('Error fetching users: ' + error.message);
  //     }
  // }
}

export default new UserRepository();
