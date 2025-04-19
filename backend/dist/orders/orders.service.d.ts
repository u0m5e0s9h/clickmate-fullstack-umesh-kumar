import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { SocketGateway } from '../socket/socket.gateway';
export declare class OrdersService {
    private ordersRepository;
    private socketGateway;
    constructor(ordersRepository: Repository<Order>, socketGateway: SocketGateway);
    createOrder(orderData: Partial<Order>): Promise<Order>;
    findAll(): Promise<Order[]>;
}
