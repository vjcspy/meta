import type { RabbitMQModuleOptions } from '../../interface/rabbitmq-module-options.interface';
import { AmqpConnection } from './connection';

export class AmqpConnectionManager {
  private connections: AmqpConnection[] = [];

  addConnection(connection: AmqpConnection) {
    this.connections.push(connection);
  }

  getConnection(name = 'default') {
    return this.connections.find(
      (connection) => connection.configuration.name === name,
    );
  }

  getConnections() {
    return this.connections;
  }

  clearConnections() {
    this.connections = [];
  }

  /**
   * Se duoc goi moi khi child module call register
   *
   * Luu lai cac config tu child module vao tung connection. Sau do connection se duoc initialize luc app bootstrap
   *
   * @param options
   */
  config(options: RabbitMQModuleOptions): AmqpConnectionManager {
    const connectionName = options.name || 'default';

    let connection = this.getConnection(connectionName);

    if (connection) {
      // exchange
      if (Array.isArray(options.exchanges)) {
        connection.configuration.exchanges = [
          ...(connection.configuration.exchanges ?? []),
          ...options.exchanges,
        ];
      }

      // channel
      if (options?.channels) {
        connection.configuration.channels = {
          ...connection.configuration.channels,
          ...options.channels,
        };
      }

      // handler
      if (Array.isArray(options.handlers)) {
        connection.configuration.handlers = [
          ...(connection.configuration.handlers ?? []),
          ...options.handlers,
        ];
      }
    } else {
      connection = new AmqpConnection(options);
      this.addConnection(connection);
    }

    return this;
  }
}

export const amqpConnectionManager = new AmqpConnectionManager();
