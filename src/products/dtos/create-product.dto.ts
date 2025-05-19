import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateProductSchema = z.object({
  id: z.string().min(6),
  name: z.string().min(2),
  description: z.string(),
  price: z.number().positive(),
  quantityInStock: z.number().int().nonnegative(),
});

export class CreateProductDto extends createZodDto(CreateProductSchema) {}