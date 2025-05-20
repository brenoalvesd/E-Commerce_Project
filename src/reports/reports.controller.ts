import {
    Controller,
    Get,
    Query,
    Res,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { GetSalesReportDto } from './dtos/get-sales-report.dto';
  import { ReportsService } from './services/reports.service';
  
  @Controller('reports')
  export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}
  
    @Get('sales')
    async downloadSalesReport(
      @Query() query: GetSalesReportDto,
      @Res() res: Response,
    ) {
      const data = await this.reportsService.getSalesReport(
        query.startDate,
        query.endDate,
      );
  
      const csv = await this.reportsService.exportToCSV(data);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="relatorio-vendas.csv"',
      );
      res.send(csv);
    }
  }
  