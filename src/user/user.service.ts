import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { CreateUserInput } from './dto/create-user.dto'
import { UpdateUserInput } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async findAllUsers(): Promise<User[]> {
    const users = this.userRepository.find()

    return users
  }

  public async findOneUserById(id: number): Promise<User> {
    const user = this.userRepository.findOne(id)

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    return user
  }

  public async createNewUser(input: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(input)
    const newUser = this.userRepository.save(user)

    if (!newUser) {
      throw new InternalServerErrorException(
        'Problem to create a user. Try again!',
      )
    }

    return newUser
  }

  public async updateUserById(
    id: number,
    input: UpdateUserInput,
  ): Promise<User> {
    const user = await this.findOneUserById(id)
    await this.userRepository.update(user, { ...input })
    const updatedUser = this.userRepository.create({ ...user, ...input })

    return updatedUser
  }

  public async deleteOneUserById(id: number): Promise<boolean> {
    const user = await this.findOneUserById(id)
    const deletedUser = this.userRepository.delete(user)

    if (deletedUser) {
      return true
    }

    return false
  }
}
