import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import type { OnApplicationBootstrap } from '@nestjs/common';
import { Global, Logger, Module } from '@nestjs/common';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';

import {
  EVENT_RX_ARGS_METADATA,
  EVENT_RX_HANDLER,
} from './util/event-manager-rx/event-rx.constants';
import { EventRxParamFactory } from './util/event-manager-rx/event-rx.factory';
import type { EventRxHandlerConfig } from './util/event-manager-rx/event-rx.types';
import { EventManagerReactive } from './util/event-manager-rx/EventManager';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [EventManagerReactive, EventRxParamFactory],
  exports: [DiscoveryModule, EventManagerReactive],
})
export class BaseModule implements OnApplicationBootstrap {
  private logger = new Logger(BaseModule.name);
  private static bootstrapped = false;

  constructor(
    private readonly discover: DiscoveryService,
    private readonly externalContextCreator: ExternalContextCreator,
    private readonly eventRxParamFactory: EventRxParamFactory,
    private readonly eventManagerReactive: EventManagerReactive
  ) {}

  onApplicationBootstrap(): any {
    if (BaseModule.bootstrapped) {
      return;
    }

    // process EventRx
    this.processEventRx();
    BaseModule.bootstrapped = true;
  }

  private async processEventRx(): Promise<void> {
    const eventRxMeta =
      await this.discover.providerMethodsWithMetaAtKey<EventRxHandlerConfig>(
        EVENT_RX_HANDLER,
        (_item) => true
      );

    await Promise.all(
      eventRxMeta.map(async ({ meta, discoveredMethod }) => {
        const handler: any = await this.externalContextCreator.create(
          discoveredMethod.parentClass.instance,
          discoveredMethod.handler,
          discoveredMethod.methodName,
          EVENT_RX_ARGS_METADATA,
          this.eventRxParamFactory,
          undefined, // contextId
          undefined, // inquirerId
          undefined, // options
          'eventRx' // contextType
        );
        await this.eventManagerReactive.createSubscriber(meta, handler, {
          discoveredMethod,
        });
      })
    );

    this.eventManagerReactive.dispatch({
      type: 'EventManagerReactive_INIT',
    });
  }
}
