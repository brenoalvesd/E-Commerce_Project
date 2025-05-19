import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { CreateOrderItemDto } from "./dtos/create-order-item.dto";
import { OrderItemsService } from "./services/order-items.service";

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() body: CreateOrderItemDto[]) {
    return this.orderItemsService.createMany(body);
  }

  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.orderItemsService.findByOrder(orderId);
  }
}
