import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateOrderSchema = z.object({
  order_id: z.string().min(6),
  user_id: z.string().min(6),
  items: z.array(
    z.object({
      product_id: z.string().min(6),
      quantity: z.number().int().positive(),
    }),
  ),
});

export class CreateOrderDto extends createZodDto(CreateOrderSchema) {}