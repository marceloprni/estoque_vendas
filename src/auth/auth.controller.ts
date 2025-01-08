import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnUserDTO } from 'src/user/dto/returnUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(
    @Body() loginDto: LoginDto, // Corrigido aqui
  ): Promise<ReturnUserDTO> {
    console.log(loginDto);
    return new ReturnUserDTO(await this.authService.login(loginDto));
  }
}
