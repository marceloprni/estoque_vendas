import { ReturnUserDTO } from 'src/user/dto/returnUser.dto';

export interface ReturnLogin {
  user: ReturnUserDTO;
  accessToken: string;
}
