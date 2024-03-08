import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as momentTimezone from 'moment-timezone';

@Injectable()
export class FireantRequest {
  constructor(private httpService: HttpService) {}

  async getPriceHistory(
    symbol: string,
    limit: number = 300,
    startDate: string = '2021-01-24',
    endDate: string = momentTimezone()
      .tz(StockInfoValue.TIMEZONE)
      .format('YYYY-MM-DD'),
    offset: number = 0,
  ) {
    const axios = this.httpService.axiosRef;

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://restv2.fireant.vn/symbols/${symbol}/historical-quotes?startDate=${startDate}&endDate=${endDate}&offset=${offset}&limit=${limit}`,
      headers: {
        authority: 'restv2.fireant.vn',
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
        authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDAyNTI1MDc0LCJuYmYiOjE3MDI1MjUwNzQsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiI2MzBEMEVERC1CRkIzLTREQjEtQTBEOC04MEJBRkYxRjMxOEMiLCJhdXRoX3RpbWUiOjE3MDI1MjUwNzMsImlkcCI6Ikdvb2dsZSIsIm5hbWUiOiJ2amNzcHkiLCJzZWN1cml0eV9zdGFtcCI6IjQwODE5M0QyLThFMTQtNDBEMS04MjU4LUI2MzRBNDkxQzJGQiIsImp0aSI6ImQ5OWI0YzBjNjNiMDA2Y2U2ZTY3ZWJkMmZiOWE0MjE5IiwiYW1yIjpbImV4dGVybmFsIl19.SO9kowKxUhlHxEfTgR7jV-d2aPu95ozn8wHtKnFoZ8-vIePkTd8XTomAw46rr-YBd4M13ZdKRCQuB-N4kfTrXg9WmLXHg90B4HOqrCnbhPNHChckTMKsPSCB9qjHFgBz6qlju1YUwjjQwYHw6JITcw-JxPZJAFdBMiLdON9qy_lN11vT-gV9XoVQMQr6rND3yp2YbnWtcvDlCL7yJg1QrjjX0e-wdAEglOyX3ytKLHkJwteswwvcwOy0pNpt4IbUFEJi8pWnXrwR0Iz4czy0uJPwzQ4cl1eAUcEB9yqZUoRaRosyPOL2s6QmQ3rJt8dQwDYRNx_JvtWBLAWcXd9kyw',
        origin: 'https://fireant.vn',
        'sec-ch-ua':
          '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    };

    return axios.request(config);
  }
}
