class BaseRepository {
  constructor(model) {
    if (!model) {
      throw new Error("Model must be provided");
    }
    this.model = model;
  }

  async insert(data) {
    const newRecord = await this.model.create(data);
    return newRecord;
  }

  async selectAll(currentPage = 1, pageSize = 10) {
    const offset = (currentPage - 1) * pageSize;
    const limit = pageSize;
    const totalRecord = await this.model.count();
    const records = await this.model.findAll({ offset: offset, limit: limit });
    return {
      data: records,
      pagination: {
        currentPage,
        pageSize,
        totalRecord,
        totalPages: Math.ceil(totalRecord / pageSize),
      },
    };
  }

  async selectById(id) {
    const record = await this.model.findByPk(id);
    return record || null;
  }

  async update(id, data) {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    return affectedRows;
  }

  async delete(id) {
    const affectedRows = await this.model.destroy({ where: { id } });
    return affectedRows;
  }
}

export default BaseRepository;
