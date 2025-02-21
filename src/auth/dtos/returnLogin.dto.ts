import { ReturnUserDTO } from '../../user/dto/returnUser.dto';

export interface ReturnLogin {
  user: ReturnUserDTO;
  accessToken: string;
}
