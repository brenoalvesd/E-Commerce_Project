// products/product.entity.ts
import { OrderItem } from 'src/orders/order-items/entities/order-item.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantityInStock: number;

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: OrderItem[];
}

export default Product;