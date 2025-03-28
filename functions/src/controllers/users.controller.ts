import {  Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { UserService } from '../services/user.service.js';



export class UsersController {
  static async getAllUsers(req: Request, res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    req.user
    res.send(await new UserService().getAllUsers());
  }

  static async getUserById(req: Request, res: Response) {
    const userId = (req.params.id);
    res.send(await new UserService().getUserById(userId));
  }

  static async createUser(req: Request, res: Response) {
    const user = req.body;
    await new UserService().createUser(user);
    res.status(201).send({ message: "Usuário criado com sucesso!" });

  }

  static async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const user = req.body as User;
    await new UserService().updateUser(userId, user)
    res.send({ message: "Usuário atualizado com sucesso!" });
  }

  static async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;
    await new UserService().deleteUser(userId);
    res.status(204).end();
  }
}