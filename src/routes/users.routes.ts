import express from 'express';
import { UsersController } from '../controllers/users.controllers';
import asyncHeadler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { userSchema } from '../models/user.model';


export const usersRoutes = express.Router();

usersRoutes.get("/users", asyncHeadler(UsersController.getAllUsers));
usersRoutes.get("/users/:id", asyncHeadler(UsersController.getUserById));
usersRoutes.post("/users", celebrate({[Segments.BODY]: userSchema}), asyncHeadler(UsersController.createUser));
usersRoutes.put("/users/:id", celebrate({[Segments.BODY]: userSchema}), asyncHeadler(UsersController.updateUser));
usersRoutes.delete("/users/:id", asyncHeadler(UsersController.deleteUser));


