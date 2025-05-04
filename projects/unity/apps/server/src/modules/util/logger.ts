// utils/Logger.ts

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface ILogger {
  log(...args: any[]): void;
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

export class ConsoleLogger implements ILogger {
  private formatPrefix(level: LogLevel): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}]`;
  }

  _log(level: LogLevel, ...args: any[]): void {
    const prefix = this.formatPrefix(level);
    console[level](prefix, ...args);
  }

  log(...args: any[]): void {
    this.info(...args);
  }

  debug(...args: any[]): void {
    this._log('debug', ...args);
  }

  info(...args: any[]): void {
    this._log('info', ...args);
  }

  warn(...args: any[]): void {
    this._log('warn', ...args);
  }

  error(...args: any[]): void {
    this._log('error', ...args);
  }
}

export const logger = new ConsoleLogger();
