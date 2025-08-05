import { CartEntity } from '../entities/cart.entity';

export class ReturnCartDTO {
  id: number;

    constructor(cart: CartEntity) {
    this.id = cart.id;
    }
