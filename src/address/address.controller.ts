import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './address.service';
import { UserType } from 'src/user/enum/user-type-enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';

@Roles(UserType.User)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto, // Corrigido aqui
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    console.log('userId', userId);
    return this.addressService.createAddress(createAddressDto, userId);
  }
}
