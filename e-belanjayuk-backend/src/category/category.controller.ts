import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Param } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  create(
    @Body() body: { name: string },
  ) {
    return this.categoryService.create(
      body.name,
    );
  }

  @Get(':id/products')
findProducts(
  @Param('id') id: string,
) {
  return this.categoryService.findProducts(id);
}
}
