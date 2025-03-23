import { CollectionReference, getFirestore } from 'firebase-admin/firestore';
import { Category } from '../models/category.model.js';

export class CategoryRepository {

  private collection: CollectionReference;

  constructor() {
    this.collection = getFirestore().collection('categories'); 
  }

  async getAll(): Promise<Category[]> {
    const snapshot = await this.collection.get();
    const categories = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }) as Category[];
    return categories;
  }

  async getById(id: string): Promise<Category | null> {
    const doc = await this.collection.doc(id).get();
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      } as Category;
    } else {
      return null;
    }
  }

  async create(category: Category): Promise<void> {
    await this.collection.add(category);
  }

  async update(category: Category): Promise<void> {
    const docRef = this.collection.doc(category.id!);
    await docRef.set({
      descricao: category.descricao,
      ativa: category.ativa
    });
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}