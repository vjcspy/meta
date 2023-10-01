import { AlertDto } from '@modules/stock-trading/controller/alert.dto';
import { StockAlertRepo } from '@modules/stock-trading/repo/stock-alert.repo';
import { XLogger } from '@nest/base/dist';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

@Controller('stock-trading')
export class AlertController {
  private readonly logger = new XLogger(AlertController.name);

  constructor(private readonly stockAlertRepo: StockAlertRepo) {}

  @Patch('alert')
  async updateAnalysis(@Body() data: AlertDto) {
    this.logger.info('process update alert', { data });

    await this.stockAlertRepo.updateAlert(data);

    return {
      success: true,
    };
  }

  @Get('alerts')
  async getAlerts() {
    this.logger.info('process get all alerts');
    const data = this.stockAlertRepo.getAll();

    return data;
  }

  // Thêm phương thức DELETE
  @Delete('alert/:id') // Sử dụng Param để lấy id từ URL
  async deleteAlert(@Param('id') id: string) {
    this.logger.info('process delete alert', { id });

    // Thực hiện xóa alert dựa trên id ở đây, bạn có thể gọi phương thức từ stockAlertRepo hoặc một tương tự.
    await this.stockAlertRepo.deleteAlert(Number(id));

    return {
      success: true,
    };
  }

  @Get('alert-disable/:id') // Sử dụng Param để lấy id từ URL
  async disableAlert(@Param('id') id: string) {
    this.logger.info('process disableAlert alert', { id });

    // Thực hiện xóa alert dựa trên id ở đây, bạn có thể gọi phương thức từ stockAlertRepo hoặc một tương tự.
    await this.stockAlertRepo.disableAlert(Number(id));

    return {
      success: true,
    };
  }
}
