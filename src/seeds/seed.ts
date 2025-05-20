import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/order-items/entities/order-item.entity';
import { Not, IsNull } from 'typeorm';

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);
  const orderRepo = AppDataSource.getRepository(Order);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);

  // 🚮 Etapa 1: Limpeza segura de dados
  console.log('🧼 Limpando dados órfãos...');

  // Deletar order_items que referenciam pedidos ou produtos inexistentes
  await orderItemRepo.query(`
    DELETE FROM order_items
    WHERE order_id NOT IN (SELECT id FROM orders)
       OR product_id NOT IN (SELECT id FROM products)
  `);

  // Deletar todos os order_items válidos
  await orderItemRepo.delete({ id: Not(IsNull()) });

  // Deletar todos os pedidos
  await orderRepo.delete({ id: Not(IsNull()) });

  // 🔍 Confirmação
  const users = await userRepo.find();
  const products = await productRepo.find();

  if (users.length === 0 || products.length === 0) {
    console.error('❌ Usuários ou produtos não encontrados. Insira-os antes de rodar o seed.');
    process.exit(1);
  }

  console.log('📦 Recriando pedidos e itens...');

  // 🧪 Etapa 2: Reabastecer pedidos e itens com dados válidos
  for (let i = 0; i < 100; i++) {
    const user = faker.helpers.arrayElement(users);

    const order = orderRepo.create({
      user,
      status: faker.helpers.arrayElement(['paid', 'pending', 'cancelled']),
      created_at: faker.date.between({
        from: '2023-01-01T00:00:00.000Z',
        to: '2025-12-31T23:59:59.999Z',
      }),
    });

    const savedOrder = await orderRepo.save(order);

    const usedProducts = new Set<string>();
    const items: OrderItem[] = [];
    const itemsCount = faker.number.int({ min: 1, max: 5 });

    for (let j = 0; j < itemsCount; j++) {
      let product;
      do {
        product = faker.helpers.arrayElement(products);
      } while (usedProducts.has(product.id));

      usedProducts.add(product.id);

      const item = orderItemRepo.create({
        order: savedOrder,
        product,
        quantity: faker.number.int({ min: 1, max: 5 }),
      });

      items.push(item);
    }

    await orderItemRepo.save(items);
  }

  console.log('✅ Pedidos e itens populados com sucesso!');
  process.exit(0);
}

seed();
