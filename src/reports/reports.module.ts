import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './services/reports.service';
import { ReportsController } from './reports.controller';
import { OrderItem } from 'src/orders/order-items/entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Product, Order])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
