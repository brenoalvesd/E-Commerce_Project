import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateUserSchema = z.object({
  id: z.string().min(6),
  email: z.string().email(),
  telephone: z.string().min(8),
  username: z.string().min(3),
  password: z.string().min(6),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}