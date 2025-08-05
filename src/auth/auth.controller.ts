import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @UsePipes(ValidationPipe)
  @Post()
  async login(
    @Body() loginDto: LoginDto, // Corrigido aqui
  ): Promise<ReturnLogin> {
    console.log(loginDto);
    return await this.authService.login(loginDto);
  }
}
