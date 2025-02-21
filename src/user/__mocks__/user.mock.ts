import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type-enum';

export const userEntityMock: UserEntity = {
  cpf: '1235123213',
  createdAt: new Date(),
  email: 'test@example.com',
  id: 1,
  name: 'Test User',
  password: 'test',
  phone: '1234567890',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
