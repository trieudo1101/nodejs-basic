class BaseRepository {
  constructor(pool, tableName) {
    if (!pool || !tableName) {
      throw new Error("Pool and table name must be provided");
    }
    this.pool = pool;
    this.tableName = tableName;
  }

  async insert(data) {
    try {
      const keys = Object.keys(data).join(", ");
      const placeholders = Object.keys(data)
        .map(() => "?")
        .join(", ");
      const values = Object.values(data);

      const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`;
      const [result] = await this.pool.query(query, values);
      return result.insertId;
    } catch (error) {
      throw new Error(
        `Error inserting into ${this.tableName}: ${error.message}`
      );
    }
  }

  async selectAll() {
    try {
      const query = `SELECT * FROM ${this.tableName}`;
      const [rows] = await this.pool.query(query);
      return rows;
    } catch (error) {
      throw new Error(
        `Error fetching all records from ${this.tableName}: ${error.message}`
      );
    }
  }

  async selectById(id) {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      const [rows] = await this.pool.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(
        `Error fetching record by ID from ${this.tableName}: ${error.message}`
      );
    }
  }

  async update(id, data) {
    try {
      const updates = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = [...Object.values(data), id];

      const query = `UPDATE ${this.tableName} SET ${updates} WHERE id = ?`;
      const [result] = await this.pool.query(query, values);
      return result.affectedRows;
    } catch (error) {
      throw new Error(
        `Error updating record in ${this.tableName}: ${error.message}`
      );
    }
  }

  async delete(id) {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
      const [result] = await this.pool.query(query, [id]);
      return result.affectedRows;
    } catch (error) {
      throw new Error(
        `Error deleting record from ${this.tableName}: ${error.message}`
      );
    }
  }
}

export default BaseRepository;
