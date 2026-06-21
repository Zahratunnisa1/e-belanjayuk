import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { Delete } from '@nestjs/common';


@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  create(
    @Body()
    body: {
      name: string;
      description?: string;
      price: number;
      stock: number;
      categoryId: string;
    },
  ) {
    return this.productService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
    },
  ){
    return this.productService.update(
      id,
      body,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id:string,
  ){
    return this.productService.remove(id);
  }
}
