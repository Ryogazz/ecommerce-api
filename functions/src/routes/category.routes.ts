import { Router } from 'express';
import asyncHeadler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { CategoryController } from '../controllers/category.controller.js';
import { newCategorySchema, updateCategorySchema } from '../models/category.model.js';


export const categoryRoutes = Router();

categoryRoutes.get("/categories", asyncHeadler(CategoryController.getAll));
categoryRoutes.get("/categories/:id", asyncHeadler(CategoryController.getById));
categoryRoutes.post("/categories", celebrate({[Segments.BODY]: newCategorySchema}), asyncHeadler(CategoryController.create));
categoryRoutes.put("/categories/:id", celebrate({[Segments.BODY]: updateCategorySchema}), asyncHeadler(CategoryController.update));
categoryRoutes.delete("/categories/:id", asyncHeadler(CategoryController.delete));


