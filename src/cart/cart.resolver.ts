import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { UpdateCartInput } from './dto/update-cart.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GqlAuthGuard } from 'src/auth/guards/auth.guard';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Cart, { name: 'cart' })
  findOnly(): Promise<Cart> {
    return this.cartService.findOnly();
  }

  @Roles('admin')
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Cart)
  updateCart(@Args('data') data: UpdateCartInput): Promise<Cart> {
    return this.cartService.update(data);
  }
}
