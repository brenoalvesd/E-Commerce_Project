import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrderItemDto } from "../dtos/create-order-item.dto";
import OrderItem from "../entities/order-item.entity";

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async createMany(items: CreateOrderItemDto[]): Promise<OrderItem[]> {
    const orderItems = this.orderItemRepository.create(items);
    return this.orderItemRepository.save(orderItems);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({
      relations: ['product', 'order'],
    });
  }

  async findByOrder(order_id: string): Promise<OrderItem[]> {
    return this.orderItemRepository.find({
      where: { order_id },
      relations: ['product'],
    });
  }
}
