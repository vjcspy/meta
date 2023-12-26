import { DiscoveryService, XLogger } from '@nest/base';
import type {
  DynamicModule,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import * as _ from 'lodash';

import type {
  RabbitHandlerConfig,
  RabbitMQConfig,
} from './interface/rabbitmq.interface';
import {
  AmqpConnectionManager,
  amqpConnectionManager,
} from './model/amqp/connection-manager';
import { RABBIT_ARGS_METADATA, RABBIT_HANDLER } from './rabbitmq.constants';
import type { ASYNC_OPTIONS_TYPE, OPTIONS_TYPE } from './rabbitmq.definition';
import {
  RABBIT_CONFIG_TOKEN,
  RabbitMQConfigurableModuleClass,
} from './rabbitmq.definition';
import { RabbitRpcParamsFactory } from './rabbitmq.factory';

@Module({
  providers: [
    {
      provide: AmqpConnectionManager,
      useFactory: async (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _config: RabbitMQConfig,
      ): Promise<AmqpConnectionManager> => {
        // create connection by config
        // console.log('->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', config);
        // amqpConnectionManager.config(config);
        return amqpConnectionManager;
      },
      inject: [RABBIT_CONFIG_TOKEN],
    },
    RabbitRpcParamsFactory,
  ],
  exports: [AmqpConnectionManager],
})
export class RabbitMQModule
  extends RabbitMQConfigurableModuleClass
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new XLogger(RabbitMQModule.name);

  private static handlers: any[] = [];

  private static bootstrapped = false;

  constructor(
    private readonly discover: DiscoveryService,
    private readonly externalContextCreator: ExternalContextCreator,
    private readonly connectionManager: AmqpConnectionManager,
    private readonly rpcParamsFactory: RabbitRpcParamsFactory,
  ) {
    super();
  }

  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const dynamicModule = super.register(options);
    if (Array.isArray(options.handlers)) {
      dynamicModule.providers = [
        // @ts-ignore
        ...dynamicModule.providers,
        ...options.handlers,
      ];
      dynamicModule.exports = [
        ...(dynamicModule.exports ?? []),
        ...options.handlers,
      ];
      RabbitMQModule.handlers = _.uniq([
        ...RabbitMQModule.handlers,
        ...options.handlers,
      ]);
    }
    amqpConnectionManager.config(options);
    return dynamicModule;
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    // const dynamicModule = super.registerAsync(options);

    return {
      // your custom logic here
      ...super.registerAsync(options),
    };
  }

  public async onApplicationBootstrap() {
    if (RabbitMQModule.bootstrapped) {
      // this.logger.info('Skipping RabbitMQModule bootstrap');
      return;
    }
    this.logger.info('Bootstrap RabbitMQModule...');
    RabbitMQModule.bootstrapped = true;
    for (let i = 0; i < this.connectionManager.getConnections().length; i++) {
      const connection = this.connectionManager.getConnections()[i];
      await connection.initialize();
    }

    if (process.env.QUEUE_CONSUMER_ENABLE !== 'true') {
      this.logger.info(
        'The consumer will NOT be registered due to being disabled in the settings.',
      );
      this.logger.warn(
        'The consumer will NOT be registered due to being disabled in the settings.',
      );

      return;
    }

    const rabbitMeta =
      await this.discover.providerMethodsWithMetaAtKey<RabbitHandlerConfig>(
        RABBIT_HANDLER,
        (item) => {
          return _.find(
            RabbitMQModule.handlers,
            (provider) => provider.name === item.name,
          );
        },
      );

    await Promise.all(
      rabbitMeta.map(async ({ meta, discoveredMethod }) => {
        const connectionName = meta?.connection ?? 'default';
        const connection = this.connectionManager.getConnection(connectionName);

        if (!connection) {
          this.logger.warn(
            `Connection ${connectionName} not found. Please register at least one configuration with uri property`,
          );

          return undefined;
        }

        const handler = this.externalContextCreator.create(
          discoveredMethod.parentClass.instance,
          discoveredMethod.handler,
          discoveredMethod.methodName,
          RABBIT_ARGS_METADATA,
          this.rpcParamsFactory,
          undefined, // contextId
          undefined, // inquirerId
          undefined, // options
          'rmq', // contextType
        );

        const { exchange, routingKey, queue, queueOptions } = meta;

        const handlerDisplayName = `${discoveredMethod.parentClass.name}.${
          discoveredMethod.methodName
        } {${meta.type}} -> ${
          queueOptions?.channel ? `${queueOptions.channel}::` : ''
        }${exchange}::${routingKey}::${queue || 'amqpgen'}`;

        if (
          meta.type === 'rpc' &&
          !connection.configuration.enableDirectReplyTo
        ) {
          this.logger.warn(
            `Direct Reply-To Functionality is disabled. RPC handler ${handlerDisplayName} will not be registered`,
          );
        }

        this.logger.log(handlerDisplayName);

        return meta.type === 'rpc'
          ? connection.createRpc(handler, meta)
          : connection.createSubscriber(
              handler,
              meta,
              discoveredMethod.methodName,
            );
      }),
    );
  }

  async onApplicationShutdown() {
    this.logger.info('Closing AMQP Connections');

    await Promise.all(
      this.connectionManager
        .getConnections()
        .map((connection) => connection.managedConnection.close()),
    );

    this.connectionManager.clearConnections();
    RabbitMQModule.bootstrapped = false;
  }

  public static addHandler(handlers: any[]) {
    RabbitMQModule.handlers.push(...handlers);
  }
}
