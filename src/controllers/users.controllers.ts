import { NextFunction, Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import { NotFoundError } from '../errors/not-found.erro';
import { User } from '../models/user.model';



export class UsersController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const snapshot = await getFirestore().collection('users').get();
    const users = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }
    );
    res.send(users);
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    const userId = (req.params.id);
    const doc = await getFirestore().collection('users').doc(userId).get();
    if (doc.exists) {
      const user = {
        id: doc.id,
        ...doc.data()
      }
      res.send(user);
    }
    else {
      throw new NotFoundError('Usuário não encontrado');
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    let user = req.body;
    const userSaved = await getFirestore().collection('users').add(user);
    res.status(201).send({ message: `Usuário criado com sucesso!, ${userSaved}` });

  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const user = req.body as User;
    const docRef = await getFirestore().collection('users').doc(userId);

    if ((await docRef.get()).exists) {
      await docRef.set({
        name: user.name,
        email: user.email
      });
      res.send({ message: "Usuário atualizado com sucesso!" });
    } else {
      throw new NotFoundError('Usuário não encontrado');
    } 
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    await getFirestore().collection('users').doc(userId).delete();
    res.status(204).end();
  }
}
