import { TedbedController } from '@modules/testbed/controller/tedbed.controller';
import { EVENT_RX } from '@modules/testbed/event-rx';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [...EVENT_RX],
  controllers: [TedbedController],
})
export class TestbedModule {}
