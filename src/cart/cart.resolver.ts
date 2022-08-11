import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { UpdateCartInput } from './dto/update-cart.input';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}
  @Query(() => Cart, { name: 'cart' })
  findOnly(): Promise<Cart> {
    return this.cartService.findOnly();
  }

  @Mutation(() => Cart)
  updateCart(@Args('data') data: UpdateCartInput): Promise<Cart> {
    return this.cartService.update(data);
  }
}
