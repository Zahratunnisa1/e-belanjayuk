import { Body, Controller, Get, Post, Param, Patch, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Delete } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get()
  findAll(
      @Query('page') page?: string,
      @Query('limit') limit?: string,
      @Query('search') search?: string,
) {
  return this.productService.findAll(
    Number(page) || 1,
    Number(limit) || 10,
    search,
  );
}
  

 @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Post()
create(
  @Body()
  body: CreateProductDto
) {
  return this.productService.create(body);
}

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.productService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Patch(':id')
update(
  @Param('id') id: string,
  @Body() body: UpdateProductDto,
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
