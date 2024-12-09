import categoryService from "../services/categoryService";
import FailedResponse from "../utils/enumResponse";

const postCategory = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const result = await categoryService.getCategoryById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: FailedResponse.NOT_FOUND });
    }
    const editMode = req.query.edit === "true";
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const result = await categoryService.getCategories();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { postCategory, getCategory, getCategories };
