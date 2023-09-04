import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { AxiosResponse } from 'axios';
import type { Observable } from 'rxjs';

@Injectable()
export class SimplizeRequest {
  constructor(private httpService: HttpService) {}

  getTicks(symbol: string): Observable<AxiosResponse<any>> {
    return this.httpService.get(
      `https://api.simplize.vn/api/historical/ticks/${symbol}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
          'sec-ch-ua':
            '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        method: 'GET',
      },
    );
  }
}
