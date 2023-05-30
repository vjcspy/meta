import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { Global, Module } from '@nestjs/common';

import { EventManagerReactive } from './util/event-manager-rx/EventManager';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [EventManagerReactive],
  exports: [DiscoveryModule, EventManagerReactive],
})
export class BaseModule {}
