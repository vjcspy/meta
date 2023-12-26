import { XLogger } from '@nest/base/dist';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { AxiosResponse } from 'axios';

@Injectable()
export class LiveRequest {
  private readonly logger = new XLogger(LiveRequest.name);

  static BASE = 'https://stock.ngocdiep.top';

  constructor(private readonly httpService: HttpService) {}

  private checkThrowError(data: AxiosResponse) {
    if (data?.data?.success !== true) {
      throw new Error('Error from live');
    }
  }

  async getCategoryList() {
    try {
      this.logger.info('Start getCategoryList');
      const res = await this.httpService.axiosRef.get(
        `${LiveRequest.BASE}/market-cat/list`,
      );
      this.checkThrowError(res);
      this.logger.info('Successfully getCategoryList');

      return res.data?.data;
    } catch (e) {
      this.logger.error(`Failed getCategoryList`, e);

      throw e;
    }
  }

  async getTickHistory(symbol: string, date: string) {
    try {
      this.logger.info(
        `Start getTickHistory for symbol ${symbol} date ${date}`,
      );
      const res = await this.httpService.axiosRef.get(
        `${LiveRequest.BASE}/tick/intra-day?symbol=${symbol}&date=${date}`,
      );
      this.checkThrowError(res);
      this.logger.info(
        `Successfully getTickHistory for symbol ${symbol} date ${date}`,
      );

      return res.data?.data;
    } catch (e) {
      this.logger.error(
        `Failed getTickHistory for symbol ${symbol} date ${date}`,
        e,
      );

      throw e;
    }
  }
}
