import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.product.findMany({
            
             include:{
               category: true,
             },                       
    });
}

async create(data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId: string;
}) {
    return this.prisma.product.create({
        data,
});
}

async findOne(id: string){
    return this.prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
        },
    });    
}

async update(
    id: string,
    data: {
        name?: string;
        description?: string;
        price?: number;
        stock?: number;
    },
){
    return this.prisma.product.update({
        where: {
            id,
        },
        data,
    });
}
async remove(id: string) {
  return this.prisma.product.delete({
    where: {
      id,
    },
  });
}
}


