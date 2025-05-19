import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateOrderItemSchema = z.object({
  order_id: z.string().min(6),
  product_id: z.string().min(6),
  quantity: z.number().int().positive(),
});

export class CreateOrderItemDto extends createZodDto(CreateOrderItemSchema) {}