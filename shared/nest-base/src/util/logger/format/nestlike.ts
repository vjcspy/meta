import safeStringify from 'fast-safe-stringify';
import * as _ from 'lodash';
import type { Format } from 'logform';
import { inspect } from 'util';
import { format } from 'winston';

const clc = {
  bold: (text: string) => `\x1B[1m${text}\x1B[0m`,
  green: (text: string) => `\x1B[32m${text}\x1B[39m`,
  yellow: (text: string) => `\x1B[33m${text}\x1B[39m`,
  red: (text: string) => `\x1B[31m${text}\x1B[39m`,
  magentaBright: (text: string) => `\x1B[95m${text}\x1B[39m`,
  cyanBright: (text: string) => `\x1B[96m${text}\x1B[39m`,
};

const nestLikeColorScheme: Record<string, (text: string) => string> = {
  info: clc.green,
  error: clc.red,
  warn: clc.yellow,
  debug: clc.magentaBright,
  verbose: clc.cyanBright,
};

export type NestLikeConsoleFormatOptions = {
  colors?: boolean;
  prettyPrint?: boolean;
  showMeta?: boolean;
};

export const nestLikeConsoleFormat = (
  appName: string = '',
  options: NestLikeConsoleFormatOptions = {
    colors: !process.env.NO_COLOR,
    prettyPrint: false,
    showMeta: false,
  },
): Format =>
  format.printf(({ context, level, timestamp, message, ms, ...meta }) => {
    if (typeof timestamp === 'undefined') {
      // Only format the timestamp to a locale representation if it's ISO 8601 format. Any format
      // that is not a valid date string will throw, just ignore it (it will be printed as-is).
      try {
        // eslint-disable-next-line no-param-reassign
        timestamp = new Date().toISOString();
      } catch (error) {
        // eslint-disable-next-line no-empty
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const color =
      (options.colors && nestLikeColorScheme[level]) ||
      ((text: string): string => text);
    const yellow = options.colors ? clc.yellow : (text: string): string => text;

    const metadata =
      _.size(meta?.metadata) === 1 ? meta.metadata[0] : undefined;

    let formattedMeta: any;
    const _level = meta[Symbol.for('level')];
    const checkShowMeta = (options.showMeta || _level !== 'info') && metadata;
    if (checkShowMeta) {
      const stringifiedMeta = safeStringify(metadata);
      formattedMeta = options.prettyPrint
        ? inspect(JSON.parse(stringifiedMeta), {
            colors: options.colors,
            depth: null,
          })
        : stringifiedMeta;
    }

    return `${yellow(level.charAt(0).toUpperCase() + level.slice(1))} ${
      typeof timestamp !== 'undefined' ? `${timestamp} ` : ''
    }${appName ? color(`[${appName}] `) : ''}${
      typeof context !== 'undefined' ? `${yellow(`[${context}]`)} ` : ''
    }${color(message)}${typeof ms !== 'undefined' ? ` ${yellow(ms)}` : ''}${
      checkShowMeta ? `\n${formattedMeta}` : ''
    }`;
  });
