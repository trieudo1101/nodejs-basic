import expenseService from "../services/expenseService.js";
import categoryService from "../services/categoryService.js";
import typeService from "../services/typeService.js";
import FailedResponse from "../utils/enumResponse.js";
import paginate from "express-paginate";

const routeToCreateExpense = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    const types = await typeService.getAllTypes();
    res.render("expenseViews/expense-create.ejs", {
      categories: categories,
      types: types,
    });
  } catch (error) {
    console.error("Error in routeToCreateExpense:", error);
    next(error);
  }
};

const postExpense = async (req, res, next) => {
  try {
    const result = await expenseService.createExpense(req.body);
    if (result) {
      return res.redirect("/expenses");
    }
  } catch (error) {
    next(error);
  }
};

const getExpenseById = async (req, res, next) => {
  const result = await expenseService.getExpenseById(req.params.id);
  const categories = await categoryService.getAllCategories();
  const types = await typeService.getAllTypes();
  if (result === FailedResponse.NOT_FOUND) {
    return res.status(404).json({ message: FailedResponse.NOT_FOUND });
  }
  const editMode = req.query.edit === "true";
  return res.render("expenseViews/expense-detail", {
    expense: result,
    isEditable: editMode,
    categories: categories,
    types: types,
  });
};

const getExpenses = async (req, res, next) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const result = await expenseService.getExpenses(page, size);

    res.render("main", {
      body: "expenseViews/expense-table",
      data: result.data,
      isLoading: false,
      pagination: {
        currentPage: result.pagination.currentPage,
        totalPages: result.pagination.totalPages,
        hasPrevious: result.pagination.currentPage > 1,
        pageSize: result.pagination.pageSize,
        hasNext: result.pagination.currentPage < result.pagination.totalPages,
        pages: paginate.getArrayPages(req)(
          5,
          result.pagination.totalPages,
          result.pagination.currentPage
        ),
      },
      currentTab: "Expense",
    });
  } catch (error) {
    next(error);
  }
};

const putExpense = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await expenseService.updateExpense(id, req.body);

    if (result === FailedResponse.NOT_FOUND) {
      return res.status(404).json({ message: FailedResponse.NOT_FOUND });
    }

    if (result === FailedResponse.UPDATE_FAILED) {
      return res.status(400).json({ message: FailedResponse.UPDATE_FAILED });
    }

    return res.redirect(`/expenses/${id}`);
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const result = await expenseService.deleteExpense(req.params.id);
    if (result === FailedResponse.NOT_FOUND) {
      return res.status(404).json({ message: FailedResponse.NOT_FOUND });
    }

    if (result === FailedResponse.DELETE_FAILED) {
      return res.status(400).json({ message: FailedResponse.DELETE_FAILED });
    }

    return res
      .status(200)
      .json({ message: "Expense deleted successfully", affectedRows: result });
  } catch (error) {
    next(error);
  }
};

export {
  routeToCreateExpense,
  postExpense,
  getExpenseById,
  getExpenses,
  putExpense,
  deleteExpense,
};
