import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';

@Entity()
export class Order {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'cancelled';

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}

export default Order;