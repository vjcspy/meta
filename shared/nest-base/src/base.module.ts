import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import type {
  MiddlewareConsumer,
  NestModule,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { Global, Logger, Module } from '@nestjs/common';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';

import { EventManagerReactive, EventRxContext } from './util';
import { UserContextMiddleware } from './util/context/user-context.middleware';
import { XAppContext } from './util/context/XAppContext';
import {
  EVENT_RX_ARGS_METADATA,
  EVENT_RX_HANDLER,
} from './util/event-manager-rx/event-rx.constants';
import { EventRxParamFactory } from './util/event-manager-rx/event-rx.factory';
import type { EventRxHandlerConfig } from './util/event-manager-rx/event-rx.types';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [
    EventManagerReactive,
    EventRxParamFactory,
    EventRxContext,
    XAppContext,
    UserContextMiddleware,
  ],
  exports: [DiscoveryModule, EventManagerReactive, EventRxContext, XAppContext],
})
export class BaseModule implements OnApplicationBootstrap, NestModule {
  private logger = new Logger(BaseModule.name);

  private static bootstrapped = false;

  constructor(
    private readonly discover: DiscoveryService,
    private readonly externalContextCreator: ExternalContextCreator,
    private readonly eventRxParamFactory: EventRxParamFactory,
    private readonly eventManagerReactive: EventManagerReactive,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserContextMiddleware).forRoutes('*'); // Áp dụng cho tất cả routes
  }

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
        () => true,
      );

    await Promise.all(
      eventRxMeta.map(async ({ meta, discoveredMethod }) => {
        const handler: any = this.externalContextCreator.create(
          discoveredMethod.parentClass.instance,
          discoveredMethod.handler,
          discoveredMethod.methodName,
          EVENT_RX_ARGS_METADATA,
          this.eventRxParamFactory,
          undefined, // contextId
          undefined, // inquirerId
          undefined, // options
          'eventRx', // contextType
        );
        await this.eventManagerReactive.createSubscriber(meta, handler, {
          discoveredMethod,
        });
      }),
    );

    this.eventManagerReactive.dispatch({
      type: 'EventManagerReactive_INIT',
    });
  }
}
