import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { SocketGateway } from '../socket/socket.gateway';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private socketGateway: SocketGateway,
  ) {}

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const order = this.ordersRepository.create(orderData);
    const savedOrder = await this.ordersRepository.save(order);
    this.socketGateway.emitNewOrder(savedOrder);
    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }
}
