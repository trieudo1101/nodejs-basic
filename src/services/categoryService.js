import categoryRepository from "../repositories/categoryRepository.js";
import FailedResponse from "../utils/enumResponse.js";

class CategoryService {
  createCategory = async (categoryData) => {
    const newCategory = await categoryRepository.insert(categoryData);
    return newCategory;
  };

  getCategoryById = async (id) => {
    const category = await categoryRepository.selectById(id);
    if (!category) {
      return FailedResponse.NOT_FOUND;
    }
    return category;
  };

  getCategories = async (currentPage, pageSize) => {
    const categories = await categoryRepository.selectAll(
      currentPage,
      pageSize
    );
    return categories;
  };

  getAllCategories = async () => {
    return await categoryRepository.selectAllCategories();
  };
}

export default new CategoryService();
