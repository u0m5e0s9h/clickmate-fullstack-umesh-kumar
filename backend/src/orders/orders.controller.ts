import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.ordersService.createOrder(orderData);
  }

  @Get()
  async getOrders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
