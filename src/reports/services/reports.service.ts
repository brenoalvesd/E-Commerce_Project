import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/orders/order-items/entities/order-item.entity';
import { Repository } from 'typeorm';
import * as createCsvWriter from 'csv-writer';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(OrderItem)
        private readonly orderItemRepo: Repository<OrderItem>,
    ) {}

    async getSalesReport(startDate?: string, endDate?: string) {
        const query = this.orderItemRepo
            .createQueryBuilder('oi')
            .leftJoin('oi.order', 'order')
            .leftJoin('oi.product', 'product')
            .select('product.name', 'product')
            .addSelect('COUNT(DISTINCT order.id)', 'ordersCount')
            .addSelect('SUM(oi.quantity)', 'unitsSold')
            .addSelect('SUM(oi.quantity * product.price)', 'revenue')
            .groupBy('product.name');

        if (startDate) {
            query.andWhere('order.created_at >= :startDate', { startDate });
        }
        if (endDate) {
            query.andWhere('order.created_at <= :endDate', { endDate });
        }

        return query.getRawMany();
    }

    async exportToCSV(data: any[]): Promise<string> {
        const csvWriter = createCsvWriter.createObjectCsvStringifier({
            header: [
                { id: 'product', title: 'Produto' },
                { id: 'ordersCount', title: 'Total de Pedidos' },
                { id: 'unitsSold', title: 'Unidades Vendidas' },
                { id: 'revenue', title: 'Receita Total (R$)' },
            ],
        });

        return csvWriter.getHeaderString() + csvWriter.stringifyRecords(data);
    }
    
    async exportSalesReportCSV(startDate?: string, endDate?: string): Promise<string> {
        const reportData = await this.getSalesReport(startDate, endDate);
        
        // Format dates for the filename or report metadata
        const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString('pt-BR') : 'início';
        const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString('pt-BR') : 'atual';
        
        // Add report metadata if needed
        const dataWithMetadata = reportData.map(item => ({
            ...item,
            // Format revenue as currency
            revenue: Number(item.revenue).toFixed(2),
        }));
        
        return this.exportToCSV(dataWithMetadata);
    }
}
