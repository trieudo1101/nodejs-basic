import userService from '../services/userService.js';

class UserController {
    getUserById = async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createUser = async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            // res.status(500).json({ message: error.message });
            next(error);
        }
    };

    getAllUsers = async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
};

export default new UserController();