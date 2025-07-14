import { Controller, Get } from '@nestjs/common';
import { UserType } from 'src/user/enum/user-type-enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { ProductService } from './product.service';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get()
  async findAll(): Promise<ReturnProduct[]> {
    return (await this.productService.findAll([], true)).map(
      (product) => new ReturnProduct(product),
    );
  }
}
