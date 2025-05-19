import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import OrderItem from "./entities/order-item.entity";
import { OrderItemsController } from "./order-items.controller";
import { OrderItemsService } from "./services/order-items.service";

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem])],
    controllers: [OrderItemsController],
    providers: [OrderItemsService],
    exports: [OrderItemsService],
  })
  export class OrderItemsModule {}
  