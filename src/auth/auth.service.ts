import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDTO } from 'src/user/dto/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';

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

    const isMatch = await bcrypt.compare(
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
