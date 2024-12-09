import userRepository from "../repositories/userRepository.js";
import FailedResponse from "../utils/enumResponse.js";

class UserService {
  createUser = async (userData) => {
    const newUser = await userRepository.insert(userData);
    return newUser;
  };

  getUserById = async (id) => {
    const user = await userRepository.selectById(id);
    if (!user) {
      return FailedResponse.NOT_FOUND;
    }
    return user;
  };

  getAllUsers = async (currentPage, pageSize) => {
    const users = await userRepository.selectAll(currentPage, pageSize);
    return users;
  };

  updateUser = async (id, userUpdateData) => {
    const existingUser = await userRepository.selectById(id);
    if (!existingUser) {
      return FailedResponse.NOT_FOUND;
    }

    const filteredData = Object.fromEntries(
      Object.entries(userUpdateData).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    const affectedRows = await userRepository.update(id, filteredData);
    if (affectedRows === 0) {
      return FailedResponse.UPDATE_FAILED;
    }
    return affectedRows;
  };

  deleteUser = async (id) => {
    const existingUser = await userRepository.selectById(id);
    if (!existingUser) {
      return FailedResponse.NOT_FOUND;
    }

    const affectedRows = await userRepository.delete(id);
    if (affectedRows === 0) {
      return FailedResponse.DELETE_FAILED;
    }
    return affectedRows;
  };
}

export default new UserService();
