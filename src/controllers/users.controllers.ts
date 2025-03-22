import  { Request, Response }   from 'express';
import { getFirestore } from 'firebase-admin/firestore';

type User = {
  id: number,
  name: string,
  email: string
}

export class UsersController {
  static async getAllUsers(req: Request, res: Response) {
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

  static async getUserById(req: Request, res: Response) {
    const userId = (req.params.id);
    const doc  = await getFirestore().collection('users').doc(userId).get();
    const user = {
      id: doc.id,
      ...doc.data()
    }
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "Usuário não encontrado" });
    }
  }

  static async createUser  (req: Request, res: Response) {
    let user = req.body;
    
    const userSaved = await getFirestore().collection('users').add(user);
    res.send({ message: `Usuário criado com sucesso!, ${userSaved}` });
  }

  static updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const user = req.body as User;

    getFirestore().collection('users').doc(userId).set({
      name: user.name,
      email: user.email
    });
      res.send({ message: "Usuário atualizado com sucesso!" });
}

  static async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;

    const deletedUser = await getFirestore().collection('users').doc(userId).delete();

    res.send({ message: "Usuário excluído com sucesso!", user :deletedUser });
} 
}