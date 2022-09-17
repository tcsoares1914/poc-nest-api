import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import { UserTestUtil } from '../../commom/test/UserTestUtil';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When find all users.', () => {
    it('should be list all users.', async () => {
      const user = UserTestUtil.getValidUserDto();
      mockRepository.find.mockReturnValue([user, user]);
      const users = await service.findAllUsers();

      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When find one user by id.', () => {
    it('should find a existing user.', async () => {
      const user = UserTestUtil.getValidUser();
      mockRepository.findOne.mockReturnValue(user);
      const foundUser = await service.findOneUserById(1);

      expect(foundUser).toMatchObject({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return NotFoundException for invalid user.', async () => {
      mockRepository.findOne.mockReturnValue(null);

      await service.findOneUserById(666).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'User not found!',
        });
      });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When create a user.', () => {
    it('shoud create a new user.', async () => {
      const user = UserTestUtil.getValidUserDto();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);
      const newUser = await service.createNewUser(user);

      expect(newUser).toMatchObject(user);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('should return InternalServerErrorException for error on user creation.', async () => {
      const user = UserTestUtil.getValidUserDto();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(null);

      await service.createNewUser(user).catch((ex) => {
        expect(ex).toBeInstanceOf(InternalServerErrorException);
        expect(ex).toMatchObject({
          message: 'Problem to create a user. Try again!',
        });
      });
    });
  });

  describe('When update user by id.', () => {
    it('should perform update to existing user.', async () => {
      const user = UserTestUtil.getValidUserDto();
      mockRepository.findOne.mockReturnValue(user);
      const updateUserData = {
        id: 1,
        firstName: 'Jardani',
        lastName: 'Jovonovich ',
        email: 'jardani@domain.com',
      };
      mockRepository.update.mockReturnValue({
        ...user,
        ...updateUserData,
      });
      mockRepository.create.mockReturnValue({
        ...user,
        ...updateUserData,
      });
      const updatedUser = await service.updateUserById(1, {
        ...user,
        ...updateUserData,
      });

      expect(updatedUser).toMatchObject(updateUserData);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.update).toBeCalledTimes(1);
      expect(mockRepository.create).toBeCalledTimes(1);
    });
  });

  describe('When delete user by id.', () => {
    it('should perform delete to existing user.', async () => {
      const user = UserTestUtil.getValidUserDto();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(user);
      const deleteAction = await service.deleteOneUserById(1);

      expect(deleteAction).toBe(true);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    });

    it('should not perform delete to existing user.', async () => {
      const user = UserTestUtil.getValidUserDto();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(null);
      const deleteAction = await service.deleteOneUserById(1);

      expect(deleteAction).toBe(false);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.delete).toBeCalledTimes(1);
    });
  });
});
