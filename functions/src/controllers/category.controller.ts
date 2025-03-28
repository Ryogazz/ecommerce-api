import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service.js'; 
import { Category } from '../models/category.model.js';

export class CategoryController {
  static async getAll(req: Request, res: Response) {
    res.send(await new CategoryService().getAll());
  }

  static async getById(req: Request, res: Response) {
    const categoryId = req.params.id;
    res.send(await new CategoryService().getById(categoryId));
  }

  static async create(req: Request, res: Response) {
    const category = req.body;
    await new CategoryService().create(category);
    res.status(201).send({ message: "Categoria criada com sucesso!" });
  }

  static async update(req: Request, res: Response) {
    const categoryId = req.params.id;
    const category = req.body as Category;
    await new CategoryService().update(categoryId, category);
    res.send({ message: "Categoria atualizada com sucesso!" });
  }

  static async delete(req: Request, res: Response) {
    const categoryId = req.params.id;
    await new CategoryService().delete(categoryId);
    res.status(204).end();
  }
}