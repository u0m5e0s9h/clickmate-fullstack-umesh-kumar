import { OrdersService } from './orders.service';
import { Order } from './order.entity';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(orderData: Partial<Order>): Promise<Order>;
    getOrders(): Promise<Order[]>;
}
