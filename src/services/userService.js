import userRepository from "../repositories/userRepository.js";

class UserService {
  createUser = async (userData) => {
    // try {
    if (!userData.fullname || !userData.email || !userData.password) {
      throw new Error("Missing required fields");
    }
    const newUser = await userRepository.insert(userData);
    return newUser;
    // } catch (error) {
    //     throw new Error('Error in service while creating user: ' + error.message);
    // }
  };

  getUserById = async (id) => {
    try {
      const user = await userRepository.selectUserById(id);
      return user;
    } catch (error) {
      throw new Error("Error in service while fetching user: " + error.message);
    }
  };

  getAllUsers = async () => {
    try {
      const users = await userRepository.selectAll();
      return users;
    } catch (error) {
      throw new Error(
        "Error in service while fetching users: " + error.message
      );
    }
  };
}

export default new UserService();
