import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const GetSalesReportSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  format: z.enum(['csv', 'xlsx']).optional(),
});

export class GetSalesReportDto extends createZodDto(GetSalesReportSchema) {}
