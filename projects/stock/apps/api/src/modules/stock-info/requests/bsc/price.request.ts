import { SyncValues } from '@modules/stock-info/values/sync.values';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { Moment } from 'moment';
import * as moment from 'moment';
import type { Observable } from 'rxjs';

@Injectable()
export class StockPriceRequest {
  constructor(private httpService: HttpService) {}

  getPrice(code: string, lastDate?: Moment, endDate?: Moment): Observable<any> {
    if (typeof lastDate === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      lastDate = moment(`${SyncValues.START_YEAR}-01-01`);
    }

    if (typeof endDate === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      endDate = moment();
    }

    return this.httpService.get(
      `https://www.bsc.com.vn/api/Data/Companies/HistoricalQuotes?symbol=${code}&startDate=${lastDate.format(
        'YYYY-M-D',
      )}&endDate=${endDate.format('YYYY-M-D')}`,
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
          cookie:
            'ASP.NET_SessionId=1azigeep1cbpw2u0n30sjeww; _culture=vi-VN; _ga=GA1.3.1493892654.1644206892; NSC_XfcTfswfs_443=ffffffff091da14845525d5f4f58455e445a4a42378b; __atuvc=1%7C9; __atuvs=62203cb235c4dace000; __atssc=google%3B1; _gid=GA1.3.423041939.1646279860; SL_G_WPT_TO=vi; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; _gat_UA-106411607-1=1',
          Referer: `https://www.bsc.com.vn/Companies/HistoricalQuotes/${code}`,
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        method: 'GET',
      },
    );
  }
}

export const getPriceFromBSC = async (
  code: string,
  lastDate?: Moment,
  endDate?: Moment,
) => {
  if (typeof lastDate === 'undefined') {
    lastDate = moment(`${SyncValues.START_YEAR}-01-01`);
  }

  if (typeof endDate === 'undefined') {
    endDate = moment();
  }
  try {
    const url = `https://www.bsc.com.vn/api/Data/Companies/HistoricalQuotes?symbol=${code}&startDate=${lastDate.format(
      'YYYY-M-D',
    )}&endDate=${endDate.format('YYYY-M-D')}`;
    const res = await fetch(url, {
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
        cookie:
          'ASP.NET_SessionId=1azigeep1cbpw2u0n30sjeww; _culture=vi-VN; _ga=GA1.3.1493892654.1644206892; __atuvc=1%7C9; __atssc=google%3B1; _gid=GA1.3.423041939.1646279860; SL_G_WPT_TO=vi; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; NSC_XfcTfswfs_443=ffffffff091da14845525d5f4f58455e445a4a42378b; _gat_UA-106411607-1=1',
        Referer: 'https://www.bsc.com.vn/Companies/HistoricalQuotes/BFC',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: null,
      method: 'GET',
    });

    return JSON.parse(await res.text());
  } catch (e) {
    return null;
  }
};
