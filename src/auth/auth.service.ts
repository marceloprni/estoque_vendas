import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDTO } from '../user/dto/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { validatePassword } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .getUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await validatePassword(
      loginDto.password,
      user?.password || '',
    );

    console.log(`isMatch ${isMatch}`);

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid');
    }

    const payload = new LoginPayload(user); // Certifique-se de que LoginPayload está correto
    console.log(payload);

    return {
      accessToken: this.jwtService.sign({ ...payload }),
      user: new ReturnUserDTO(user),
    };
  }
}
