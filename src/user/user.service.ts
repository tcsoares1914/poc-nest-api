import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  /**
   * Inject repository dependency.
   * @param {Repository} userRepository repository to be inected.
   */
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Find all users.
   * @public
   *
   * @return {User} list of all users.
   */
  public async findAllUsers(): Promise<User[]> {
    const users = this.userRepository.find();

    return users;
  }

  /**
   * Find one user.
   * @public
   * @param {number} id identification of user.
   *
   * @return {User} details of one user.
   */
  public async findOneUserById(id: number): Promise<User> {
    const user = this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  /**
   * Create a new user.
   * @public
   * @param {CreateUserDto} input user data to create new user.
   *
   * @return {User} details of created user.
   */
  public async createNewUser(input: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(input);
    const newUser = this.userRepository.save(user);

    if (!newUser) {
      throw new InternalServerErrorException(
        'Problem to create a user. Try again!',
      );
    }

    return newUser;
  }

  /**
   * Update one user.
   * @public
   * @param {number} id identification of user.
   * @param {UpdateUserDto} input user data to update user.
   *
   * @return {User} details of updated user.
   */
  public async updateUserById(id: number, input: UpdateUserDto): Promise<User> {
    const user = await this.findOneUserById(id);
    await this.userRepository.update(user, { ...input });
    const updatedUser = this.userRepository.create({ ...user, ...input });

    return updatedUser;
  }

  /**
   * Delete one user.
   * @public
   * @param {int} id identification of user.
   *
   * @return {bool} status of action for delete user.
   */
  public async deleteOneUserById(id: number): Promise<boolean> {
    const user = await this.findOneUserById(id);
    const deletedUser = this.userRepository.delete(user);

    if (deletedUser) {
      return true;
    }

    return false;
  }
}
