import { ConfigurableModuleBuilder } from '@nestjs/common';

import type { RabbitMQModuleOptions } from './interface/rabbitmq-module-options.interface';

export const {
  ConfigurableModuleClass: RabbitMQConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: RABBIT_CONFIG_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<RabbitMQModuleOptions>().build();
