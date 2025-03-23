import { CollectionReference, getFirestore } from 'firebase-admin/firestore';
import { User } from '../models/user.model';

export class UserRepository {

  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection('users');
  }
  async getAllUsers(): Promise<User[]> {
    const snapshot = await  this.collection.get();
    const users = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }
    ) as User[];
    return users;
  }

  async getUserById(userId: string): Promise<User | null> {
    const doc = await this.collection.doc(userId).get();
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      } as User;
    }
    else {
      return null;
    }
  }

  async createUser(user: User): Promise<void> {
    delete user.password;
    await this.collection.add(user);
  }

  async updateUser(user: User): Promise<void> {
    const docRef = this.collection.doc(user.id);
      await docRef.set({
        name: user.name,
        email: user.email
      });
  }

  async deleteUser(userId: string): Promise<void> {
    await getFirestore().collection('users').doc(userId).delete();
  }
}