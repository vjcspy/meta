export { AmqpConnectionManager } from './model/amqp/connection-manager';
export { Nack } from './model/amqp/handler-response';
export * from './rabbitmq.decorator';
export * from './rabbitmq.module';
export type {
  ConfirmChannel,
  Connection,
  ConsumeMessage,
  Options,
  Replies,
} from 'amqplib';
