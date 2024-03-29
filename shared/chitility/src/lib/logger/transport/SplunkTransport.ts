import safeStringify from 'fast-safe-stringify';
import _ from 'lodash';
import { Logger as SplunkLogger } from 'splunk-logging';
import TransportStream from 'winston-transport';

export type SplunkTransportConfig = {
  appName?: string;
  enable: any;
  url: string;
  token: string;
  index: string;
  source: string;
  sourcetype?: string;
  eventFormatter?: any;
} & TransportStream.TransportStreamOptions;
export class SplunkTransport extends TransportStream {
  private maxError = 10;

  private errorCount = 0;

  private enable = false;

  private name: string | undefined;

  private defaultMetadata: any;

  private server: SplunkLogger;

  constructor(config: SplunkTransportConfig) {
    super(config);

    if (config?.enable !== 'true' && config?.enable !== true) {
      return;
    }

    if (config?.url && config?.token) {
      // This gets around a problem with setting maxBatchCount
      this.server = new SplunkLogger({
        maxBatchCount: 1,
        token: config.token,
        url: config.url,
      });
      this.enable = true;
    } else {
      return;
    }

    this.name = config?.appName ?? 'SplunkStreamEvent';
    this.level = config.level || 'silly';

    this.defaultMetadata = {
      source: config?.source,
      sourcetype: '_json',
      index: config.index,
    };
    if (config?.source) {
      this.defaultMetadata.source = config.source;
    }
    if (config?.sourcetype) {
      this.defaultMetadata.sourcetype = config.sourcetype;
    }
    if (config?.index) {
      this.defaultMetadata.index = config.index;
    }

    // Override the default event formatter
    if (config?.eventFormatter) {
      this.server.eventFormatter = config.eventFormatter;
    } else {
      this.server.eventFormatter = (message, severity) => {
        if (typeof message === 'string') {
          // eslint-disable-next-line no-param-reassign
          message = {
            message,
          };
        }
        return {
          ...message,
          severity,
        };
      };
    }
  }

  log(info: any, callback?: any) {
    setImmediate(() => this.emit('logged', info));

    try {
      if (!this.enable || this.maxError < this.errorCount) {
        callback(null, true);
        return;
      }

      const level = info[Symbol.for('level')];
      const meta = { ...info };
      delete meta[Symbol.for('level')];
      delete meta[Symbol.for('splat')];
      delete meta[Symbol.for('message')];

      const splunkInfo = info.splunk || {};
      meta.metadata =
        Array.isArray(meta.metadata) && _.size(meta.metadata) === 1
          ? meta.metadata[0]
          : undefined;
      const payload = JSON.parse(
        safeStringify({
          message: meta,
          metadata: { ...this.defaultMetadata, ...splunkInfo },
          severity: level,
        }),
      );

      this.server.send(payload, (error) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error('splunk forward error', error);
          this.errorCount += 1;
        }
        if (callback) {
          callback(null, true);
        }
      });
    } catch (e) {
      // shallow
      console.log(e);
    }
  }
}
