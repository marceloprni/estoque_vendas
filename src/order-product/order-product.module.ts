import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';

@Module({
  providers: [OrderProductService]
})
export class OrderProductModule {}
