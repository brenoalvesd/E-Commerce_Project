import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Order from "./entities/order.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./services/orders.service";

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
  })
  export class OrdersModule {}
  