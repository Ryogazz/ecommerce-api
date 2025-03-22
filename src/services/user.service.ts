import { getFirestore } from 'firebase-admin/firestore';
import { User } from '../models/user.model';
import { NotFoundError } from '../errors/not-found.erro';

export class UserService {
  async getAllUsers(): Promise<User[]> {
    const snapshot = await getFirestore().collection('users').get();
    const users = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }
    ) as User[];
    return users;
  }

  async getUserById(userId: string): Promise<User> {
    const doc = await getFirestore().collection('users').doc(userId).get();
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      } as User;
    }
    else {
      throw new NotFoundError('Usuário não encontrado');
    }
  }

  async createUser(user: User): Promise<void> {
    await getFirestore().collection('users').add(user);
}

  async updateUser(userId: string, user: User): Promise<void> {
    const docRef = await getFirestore().collection('users').doc(userId);
    if ((await docRef.get()).exists) {
      await docRef.set({
        name: user.name,
        email: user.email
      });
    } else {
      throw new NotFoundError('Usuário não encontrado');
    }
  }

  async deleteUser(userId: string): Promise<void> {
    await getFirestore().collection('users').doc(userId).delete();
  }
}