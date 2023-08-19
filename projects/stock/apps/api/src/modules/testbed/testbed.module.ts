import { TedbedController } from '@modules/testbed/controller/tedbed.controller';
import { EVENT_RX } from '@modules/testbed/event-rx';
import { TestbedService } from '@modules/testbed/service/testbed.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [...EVENT_RX, TestbedService],
  controllers: [TedbedController],
})
export class TestbedModule {}
