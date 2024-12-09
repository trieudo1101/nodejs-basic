import userService from "../services/userService.js";
import FailedResponse from "../utils/enumResponse.js";

const getUserById = async (req, res, next) => {
  try {
    const result = await userService.getUserById(req.params.id);
    if (result === FailedResponse.NOT_FOUND) {
      return res.status(404).json({ message: FailedResponse.NOT_FOUND });
    }

    const editMode = req.query.edit === "true";
    return res.render("userViews/user-detail.ejs", {
      user: result,
      isEditable: editMode,
    });
  } catch (error) {
    next(error);
  }
};

const routeToUserCreate = (req, res, next) => {
  res.render("userViews/user-create.ejs");
};

const postUser = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    if (result) {
      return res.redirect(`/users`);
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const result = await userService.getAllUsers(Number(page), Number(size));
    res.render("main", {
      body: "userViews/user-table",
      data: result.data,
      isLoading: false,
      pagination: result.pagination,
      currentTab: "User",
    });
  } catch (error) {
    next(error);
  }
};

const putUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await userService.updateUser(id, req.body);

    if (result === FailedResponse.NOT_FOUND) {
      return res.status(404).json({ message: FailedResponse.NOT_FOUND });
    }

    if (result === FailedResponse.UPDATE_FAILED) {
      return res.status(400).json({ message: FailedResponse.UPDATE_FAILED });
    }

    return res.redirect(`/users/${id}`);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);

    if (result === FailedResponse.NOT_FOUND) {
      return res.status(404).json({ message: FailedResponse.NOT_FOUND });
    }

    if (result === FailedResponse.DELETE_FAILED) {
      return res.status(400).json({ message: FailedResponse.DELETE_FAILED });
    }

    return res.redirect(`/users`);
  } catch (error) {
    next(error);
  }
};

export {
  getUserById,
  postUser,
  getAllUsers,
  putUser,
  deleteUser,
  routeToUserCreate,
};
