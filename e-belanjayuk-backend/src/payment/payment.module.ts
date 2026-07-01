import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [PaymentService],
  imports: [PrismaModule],
  controllers: [PaymentController]
})
export class PaymentModule {}
