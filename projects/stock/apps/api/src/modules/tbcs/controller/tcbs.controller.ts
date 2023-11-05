import {
  GetTokenRequest,
  TcbsBaseRequest,
  TcbsFilterRequest,
} from '@modules/tbcs/controller/tcbs.dto';
import { TCBSHelper } from '@modules/tbcs/helper/tcbs.helper';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('tcbs')
export class TcbsController {
  constructor(private readonly tcbsHelper: TCBSHelper) {}

  @Post('token')
  @HttpCode(200)
  getToken(@Body() tokenQuery: GetTokenRequest) {
    return this.tcbsHelper.getToken({ password: tokenQuery.password });
  }

  @Post('filter')
  @HttpCode(200)
  filter(@Body() filterRequest: TcbsFilterRequest) {
    return this.tcbsHelper.filter(filterRequest);
  }

  @Post('analysis')
  analysis(@Body() request: TcbsBaseRequest) {
    return this.tcbsHelper.filter({
      ...request,
      size: 500,
      filters: [
        {
          key: 'exchangeName',
          value: 'HOSE',
          operator: '=',
        },
      ],
    });
  }
}
