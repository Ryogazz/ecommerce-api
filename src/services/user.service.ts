import { User } from '../models/user.model';
import { NotFoundError } from '../errors/not-found.erro';
import { UserRepository } from '../repositories/user.repository';

export class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();

  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
    return user;
  }

  async createUser(user: User): Promise<void> {
    return await this.userRepository.createUser(user);
  }

  async updateUser(userId: string, user: User): Promise<void> {
    const _user = await this.userRepository.getUserById(userId);
    if (!_user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    _user.name = user.name;
    _user.email = user.email;
      await this.userRepository.updateUser(_user);
  }

  async deleteUser(userId: string): Promise<void> {
    return await this.userRepository.deleteUser(userId);
  }
}