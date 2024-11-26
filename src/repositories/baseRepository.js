class BaseRepository {
    constructor(pool, tableName) {
        if (!pool || !tableName) {
            throw new Error('Pool and table name must be provided');
        }
        this.pool = pool;
        this.tableName = tableName;
    }

    async insert(data) {
        try {
            const keys = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
            const values = Object.values(data);

            const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`;
            const [result] = await this.pool.query(query, values);
            return result.insertId;
        } catch (error) {
            throw new Error(`Error inserting into ${this.tableName}: ${error.message}`);
        }
    }

    async selectAll() {
        try {
            const query = `SELECT * FROM ${this.tableName}`;
            const [rows] = await this.pool.query(query);
            return rows;
        } catch (error) {
            throw new Error(`Error fetching all records from ${this.tableName}: ${error.message}`);
        }
    }
}

export default BaseRepository;