import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import asyncHeadler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { newUserSchema, updateUserSchema } from '../models/user.model.js';


export const usersRoutes = Router();

usersRoutes.get("/users", asyncHeadler(UsersController.getAllUsers));
usersRoutes.get("/users/:id", asyncHeadler(UsersController.getUserById));
usersRoutes.post("/users", celebrate({[Segments.BODY]: newUserSchema}), asyncHeadler(UsersController.createUser));
usersRoutes.put("/users/:id", celebrate({[Segments.BODY]: updateUserSchema}), asyncHeadler(UsersController.updateUser));
usersRoutes.delete("/users/:id", asyncHeadler(UsersController.deleteUser));


