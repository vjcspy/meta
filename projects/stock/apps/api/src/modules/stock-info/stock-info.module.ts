import { CorController } from '@modules/stock-info/controller/cor.controller';
import { CorEffects } from '@modules/stock-info/observers/cor/cor.effects';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [CorEffects],
  controllers: [CorController],
})
export class StockInfoModule {}
