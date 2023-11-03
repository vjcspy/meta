import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { pick } from 'lodash';

@Injectable()
export class TcbsHelper {
  constructor(
    private readonly http: HttpService,
    private readonly configEnv: ConfigService,
  ) {}

  async getToken(creds: { username?: string; password: string }) {
    const username = creds.username ?? this.configEnv.get('TCBS_USERNAME');
    if (!username) {
      throw new HttpException('Check TCBS Creds', HttpStatus.BAD_REQUEST);
    }

    const data = JSON.stringify({
      username,
      password: creds.password,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://apipub.tcbs.com.vn/authen/v1/login',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Referer: 'https://tcinvest.tcbs.com.vn/',
      },
      data,
    };

    const res = await this.http.axiosRef(config);

    try {
      if (res && res.data) {
        return res.data;
      }
    } catch (e) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    throw new HttpException(
      'Error when call get TCBS token',
      HttpStatus.BAD_REQUEST,
    );
  }

  async filter(request: any) {
    const data = pick(request, ['tcbsID', 'filters', 'size']);
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://apiextaws.tcbs.com.vn/ligo/v1/watchlist/preview',
      headers: {
        authority: 'apiextaws.tcbs.com.vn',
        accept: 'application/json',
        authorization: `Bearer ${request.token}`,
        'content-type': 'application/json',
        origin: 'https://tcinvest.tcbs.com.vn',
        referer: 'https://tcinvest.tcbs.com.vn/',
      },
      data,
    };

    const res = await this.http.axiosRef(config);
    try {
      if (res && res.data) {
        return res.data;
      }
    } catch (e) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    throw new HttpException(
      'Error when call TCBS filter',
      HttpStatus.BAD_REQUEST,
    );
  }
}
