import express from "express";
import {
  getUserById,
  getAllUsers,
  postUser,
  putUser,
  deleteUser,
  routeToUserCreate,
} from "../controllers/userController.js";
import validate from "../middlewares/validateMiddleware.js";
import { userCreateSchema, userUpdateSchema } from "../schemas/userSchema.js";

const router = express.Router();

const userRoutes = (app) => {
  router.put("/:id", validate(userUpdateSchema), putUser);

  //Navigate
  router.get("/user-create", routeToUserCreate);

  //Action
  router.post("/put-user", validate(userUpdateSchema), putUser);
  router.post("/post-user", validate(userCreateSchema), postUser);

  //Render
  router.get("/", getAllUsers);
  router.get("/:id", getUserById);
  router.get("/delete-user/:id", deleteUser);

  return app.use("/users", router);
};

export default userRoutes;
