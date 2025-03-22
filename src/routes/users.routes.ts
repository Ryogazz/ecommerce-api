import express from 'express';
import { UsersController } from '../controllers/users.controllers';
import asyncHeadler from 'express-async-handler';


export const usersRoutes = express.Router();

usersRoutes.get("/users", asyncHeadler(UsersController.getAllUsers));
usersRoutes.get("/users/:id", asyncHeadler(UsersController.getUserById));
usersRoutes.post("/users", asyncHeadler(UsersController.createUser));
usersRoutes.put("/users/:id", asyncHeadler(UsersController.updateUser));
usersRoutes.delete("/users/:id", asyncHeadler(UsersController.deleteUser));


