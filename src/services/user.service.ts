import { User } from '../models/user.model.js';
import { NotFoundError } from '../errors/not-found.erro.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AuthService } from './auth.service.js';


export class UserService {

  private userRepository: UserRepository;
  private authService: AuthService;
  constructor() {
    this.userRepository = new UserRepository();
    this.authService = new AuthService();
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
    const userRecord = await this.authService.create(user);
    user.id = userRecord.uid;
    await this.userRepository.updateUser(user);
  }

  async updateUser(userId: string, user: User): Promise<void> {
    const _user = await this.userRepository.getUserById(userId);
    if (!_user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    _user.name = user.name;
    _user.email = user.email;
      await this.authService.update(userId, user);
      await this.userRepository.updateUser(_user);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.authService.deleteUser(userId);
    return await this.userRepository.deleteUser(userId);
  }
}
