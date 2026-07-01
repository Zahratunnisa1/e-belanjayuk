import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class OrderService {

  constructor(
    private prisma: PrismaService,
  ) {}


  async createOrder(userId:string){

    const cartItems =
    await this.prisma.cart.findMany({
      where:{
        userId,
      },

      include:{
            product:true,
          },
      });


    if(cartItems.length === 0){
      throw new BadRequestException('Cart kosong');
    }

    for (const item of cartItems){
      if (item.quantity > item.product.stock){
        throw new BadRequestException(
          `${item.product.name} stok tidak mencukupi`,
        );
      }
    }

    const total = cartItems.reduce(
      (sum,item)=>
      sum + item.product.price * item.quantity, 0,
    );


    const order =
    await this.prisma.order.create({

      data:{

        userId,

        total,
          },
        });

for (const item of cartItems){
  await this.prisma.product.update({
    where: {
      id: item.productId,
    },
  data: {
    stock: {
      decrement: item.quantity,
    },
  },
  });
}

    await this.prisma.cart.deleteMany({

      where:{
        userId,
      },
    });


    return order;
  }

async getOrders() {
  return this.prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}
async getOrderById(id: string){
  return this.prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

async updateStatus(
  id: string,
  status: string,
) {
  return this.prisma.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
});
}
}
