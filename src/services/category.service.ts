import { NotFoundError } from '../errors/not-found.erro.js';
import { Category } from '../models/category.model.js';
import { CategoryRepository } from '../repositories/category.repository.js';

export class CategoryService {

  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }

  async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.getById(id);
    if (!category) {
      throw new NotFoundError('Categoria não encontrada');
    }
    return category;
  }

  async create(category: Category): Promise<void> {
    await this.categoryRepository.create(category);
  }

  async update(id: string, category: Category): Promise<void> {
    const _category = await this.getById(id);
    
    _category.descricao = category.descricao;
    _category.ativa = category.ativa;

    await this.categoryRepository.update(_category);
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}