import { Test, TestingModule } from '@nestjs/testing'
import { UserResolver } from '../user.resolver'
import { UserService } from '../user.service'
import { User } from '../user.entity'
import { CreateUserInput } from '../dto/create-user.dto'
import { UpdateUserInput } from '../dto/update-user.dto'

describe('UserResolver', () => {
  let userResolver: UserResolver
  let userService: UserService

  const allUsers: User[] = [
    {
      id: 1,
      firstName: 'Solid',
      lastName: 'Snake',
      email: 'solid@doamin.com',
      password: '#password@123',
    },
    {
      id: 2,
      firstName: 'Liquid',
      lastName: 'Snake',
      email: 'liquid@doamin.com',
      password: '#password@123',
    },
  ]

  const newUser: User = new User({
    firstName: 'Meryl',
    lastName: 'Silverburgh',
    email: 'meryl@domain.com',
    password: '#password@123',
  })

  const updatedUser = new User({
    id: 1,
    firstName: 'Hal',
    lastName: 'Emmerich',
    email: 'otacon@domain.com',
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            findAllUsers: jest.fn().mockResolvedValue(allUsers),
            createNewUser: jest.fn().mockResolvedValue(newUser),
            findOneUserById: jest.fn().mockResolvedValue(allUsers[0]),
            updateUserById: jest.fn().mockResolvedValue(updatedUser),
            deleteOneUserById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile()

    userResolver = module.get<UserResolver>(UserResolver)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(userResolver).toBeDefined()
    expect(userService).toBeDefined()
  })

  describe('When try to list all users.', () => {
    it('should return a list all users.', async () => {
      const response = await userResolver.users()

      expect(response).toEqual(allUsers)
      expect(typeof response).toEqual('object')
      expect(userService.findAllUsers).toHaveBeenCalledTimes(1)
    })
    it('should thow an exception when list all users.', () => {
      jest.spyOn(userService, 'findAllUsers').mockRejectedValueOnce(new Error())

      expect(userResolver.users()).rejects.toThrowError()
    })
  })

  describe('When try to create a new user.', () => {
    it('should create a new user.', async () => {
      const input: CreateUserInput = {
        firstName: 'Meryl',
        lastName: 'Silverburgh',
        email: 'meryl@domain.com',
        password: '#password@123',
      }
      const response = await userResolver.createUser(input)

      expect(response).toEqual(newUser)
      expect(userService.createNewUser).toHaveBeenCalledTimes(1)
      expect(userService.createNewUser).toHaveBeenCalledWith(input)
    })
    it('should thor an exception when create a new user.', () => {
      jest
        .spyOn(userService, 'createNewUser')
        .mockRejectedValueOnce(new Error())

      expect(userResolver.createUser).rejects.toThrowError()
    })
  })

  describe('When try to list one user.', () => {
    it('should list one user.', async () => {
      const response = await userResolver.user(1)

      expect(response).toEqual(allUsers[0])
      expect(userService.findOneUserById).toHaveBeenCalledTimes(1)
      expect(userService.findOneUserById).toHaveBeenCalledWith(1)
    })
    it('should throw an exception when list one user.', async () => {
      jest
        .spyOn(userService, 'findOneUserById')
        .mockRejectedValueOnce(new Error())

      expect(userResolver.user(1)).rejects.toThrowError()
    })
  })

  describe('When try to update user data.', () => {
    it('should update a one user data.', async () => {
      const input: UpdateUserInput = {
        id: 1,
        firstName: 'Hal',
        lastName: 'Emmerich',
        email: 'otacon@domain.com',
        password: 'password@321',
      }
      const result = await userResolver.updateUserById(1, input)

      expect(result).toEqual(updatedUser)
      expect(userService.updateUserById).toBeCalledTimes(1)
      expect(userService.updateUserById).toBeCalledWith(1, input)
    })

    it('should throw an exception when update one user.', () => {
      jest
        .spyOn(userService, 'updateUserById')
        .mockRejectedValueOnce(new Error())

      expect(userResolver.updateUserById).rejects.toThrowError()
    })
  })

  describe('When try to delete user.', () => {
    it('should delete user.', async () => {
      const result = await userResolver.deleteUserById(1)

      expect(result).toBeUndefined()
    })
  })
})
