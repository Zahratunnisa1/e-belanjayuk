import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService){}

    @UseGuards(JwtAuthGuard)
    @Post(':orderId')
    pay(@Param('orderId') orderId: string) {
        return this.paymentService.pay(orderId);
    }

}
