import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService){}

    async findAll(
        page: number,
        limit: number,
        search?: string,
    ) {
        return this.prisma.product.findMany({
            where: search ?
            {
               name: {
                contains: search,
                mode: 'insensitive',
               },
             }
             : {},
             skip: (page - 1)  * limit, 
             take: limit,
             include: {
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


