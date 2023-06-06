import { EVENT_RX } from '@modules/testbed/event-rx';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [...EVENT_RX],
  controllers: [],
})
export class TestbedModule {}
