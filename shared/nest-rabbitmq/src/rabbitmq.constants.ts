import { getAppName } from '@nest/base';

export const RABBIT_HANDLER = Symbol('RABBIT_HANDLER');
export const RABBIT_CONFIG_TOKEN = Symbol('RABBIT_CONFIG');
export const RABBIT_ARGS_METADATA = 'RABBIT_ARGS_METADATA';
export const RABBIT_PARAM_TYPE = 3;
export const RABBIT_HEADER_TYPE = 4;
export const RABBIT_REQUEST_TYPE = 5;

export const getDefaultRabbitChannel = () => {
  const defaultChannel: any = {};
  defaultChannel[getAppName()] = {
    prefetchCount: 1,
    default: true,
  };
  return defaultChannel;
};

export const getDefaultRabbitUri = () => {
  const config = {
    rabbitmq: {
      host: process.env.RABBITMQ_HOST || 'localhost',
      port: process.env.RABBITMQ_PORT
        ? parseInt(process.env.RABBITMQ_PORT, 10)
        : 5672,
      user: process.env.RABBITMQ_DEFAULT_USER || 'rabbitmq',
      pass: process.env.RABBITMQ_DEFAULT_PASS || '123456aA@',
    },
  };
  return `amqp://${config.rabbitmq.user}:${config.rabbitmq.pass}@${config.rabbitmq.host}:${config.rabbitmq.port}`;
};
