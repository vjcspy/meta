import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { prisma } from 'src/util/prisma';

import { StrategyHistoryTestResultDTO } from './strategy-history-test-result.dto';

@Controller('strategy-history-test-result')
export class StrategyHistoryTestResultController {
  @Get('get')
  public async get(
    @Query('type') type: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ): Promise<any> {
    const result = await prisma.strategyHistoryTestResult.findMany({
      where: {
        type,
        start,
        end,
      },
    });

    return plainToInstance(StrategyHistoryTestResultDTO, result);
  }

  @Post('save')
  public async save(@Body() data: StrategyHistoryTestResultDTO): Promise<any> {
    const result = await prisma.strategyHistoryTestResult.create({
      data,
    });

    return { ok: result.id };
  }
}
