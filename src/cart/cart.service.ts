import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCartInput } from './dto/update-cart.input';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async findOnly(): Promise<Cart> {
    const [cart] = await this.cartRepository.find();
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async update(updateCartInput: UpdateCartInput): Promise<Cart> {
    const cart = await this.findOnly();
    cart.min_cart_value = updateCartInput.minCartValue;
    return await this.cartRepository.save(cart);
  }
}
