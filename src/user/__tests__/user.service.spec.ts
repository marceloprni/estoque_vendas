import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { userEntityMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/createUser.mock';

describe('User2Service', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in getUserByEmail', async () => {
    const user = await service.getUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in getUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should return error in getUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrowError();
  });

  it('should return user in getUserById', async () => {
    const user = await service.getUserById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error in getUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.getUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return error in findOne (error db)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.getUserById(userEntityMock.id)).rejects.toThrowError();
  });

  it('should return user in getUserByIdUsingReferences', async () => {
    const user = await service.getUserByIdUsingReferences(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exits', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should return use if user not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });
});
