import { Body, Controller, Get, Post, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(@Request() req) {
    return this.orderService.createOrder(
        req.user.userId,
    );
}

    @Get()
    getOrders(){
        return this.orderService.getOrders();
    }

    @Get(':id')
    getOrderById(
        @Param('id') id: string,
    ){
        return this.orderService.getOrderById(id);
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() body: { status: string},
    ) {
        return this.orderService.updateStatus(
            id,
            body.status,
        );
    }
}
