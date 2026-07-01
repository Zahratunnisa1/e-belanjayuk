import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
    constructor(private prisma: PrismaService) {}

    async pay(orderId: string){
        return this.prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
               status: 'PAID',
            },
        });
    }
}

