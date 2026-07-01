import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';

import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


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
    body: AddToCartDto,
    
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


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.cartService.remove(id);
  }

}