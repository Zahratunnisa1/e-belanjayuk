import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Delete, Param } from '@nestjs/common';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addToCart(
    @Request() req,
    @Body()
    body: {
      productId: string;
      quantity: number;
    },
  ) {
    return this.cartService.addToCart(
      req.user.userId,
      body.productId,
      body.quantity,
    );
  }

@UseGuards(JwtAuthGuard)
@Get()
findMyCart(@Request() req) {
  return this.cartService.findMyCart(
    req.user.userId,
  );
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.cartService.remove(id);
}
}