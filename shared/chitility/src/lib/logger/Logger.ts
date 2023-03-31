import type { LeveledLogMethod, Logger as WinstonLogger } from 'winston';
import type * as Transport from 'winston-transport';

export type LoggerConfig = {
  type?: string;
  context?: string;
  transports?: Transport[];
  level?: string;
};

const _logger: Record<string, WinstonLogger> = {};
export abstract class Logger {
  protected context: string | undefined;

  private type: string;

  transports: Transport[];

  level: string;

  constructor(config: LoggerConfig) {
    this.context = config?.context;
    this.transports = config?.transports ?? [];
    this.type = config.type ?? 'default';
    this.level = config?.level ?? 'silly';
  }

  private _init() {
    if (typeof _logger[this.type] === 'undefined') {
      _logger[this.type] = this.createWinston();
    }
  }

  abstract createWinston(): WinstonLogger;

  getInstance() {
    this._init();
    _logger[this.type].defaultMeta = { context: this.context };
    return _logger[this.type];
  }

  // for cli and npm levels
  error: LeveledLogMethod = (message: any, ...args: any[]) => {
    return this.getInstance().error(message, ...args);
  };

  warn: LeveledLogMethod = (message: any, ...args: any[]) => {
    return this.getInstance().warn(message, ...args);
  };

  info: LeveledLogMethod = (message: any, ...args: any[]) => {
    return this.getInstance().info(message, ...args);
  };
}
