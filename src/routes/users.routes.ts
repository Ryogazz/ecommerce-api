import express from 'express';
import { UsersController } from '../controllers/users.controllers';


export const usersRoutes = express.Router();

usersRoutes.get("/users", UsersController.getAllUsers);
usersRoutes.get("/users/:id", UsersController.getUserById);
usersRoutes.post("/users", UsersController.createUser);
usersRoutes.put("/users/:id", UsersController.updateUser);
usersRoutes.delete("/users/:id", UsersController.deleteUser);


