import { Controller, Get, Req } from '@nestjs/common';

@Controller('ip')
export class IpController {
  @Get('info')
  info(@Req() request: Request) {
    return request.headers;
  }
}
