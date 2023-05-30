import { Logger as SplunkLogger } from 'splunk-logging';
import * as TransportStream from 'winston-transport';

import { getAppName } from '../../environment';

export class SplunkTransport extends TransportStream {
  private maxError = 10;

  private errorCount = 0;

  private enable = false;

  private name: string | undefined;

  private defaultMetadata: any;

  private server: SplunkLogger;

  constructor(config) {
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

    this.name = config?.name ?? 'SplunkStreamEvent';
    this.level = config.level || 'info';

    this.defaultMetadata = {
      source: config?.source ?? getAppName(),
      sourcetype: '_json',
      index: config.index,
    };
    if (config?.splunk?.source) {
      this.defaultMetadata.source = config.splunk.source;
    }
    if (config?.splunk?.sourcetype) {
      this.defaultMetadata.sourcetype = config.splunk.sourcetype;
    }
    if (config?.splunk?.index) {
      this.defaultMetadata.index = config.splunk.index;
    }

    // Override the default event formatter
    if (config?.splunk?.eventFormatter) {
      this.server.eventFormatter = config.splunk.eventFormatter;
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

  log(info, callback) {
    if (!this.enable || this.maxError < this.errorCount) {
      callback(null, true);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const level = info[Symbol.for('level')];
    const meta = { ...info };
    delete meta[Symbol.for('level')];
    delete meta[Symbol.for('splat')];
    delete meta[Symbol.for('message')];

    const splunkInfo = info.splunk || {};

    const payload = {
      message: meta,
      metadata: { ...this.defaultMetadata, ...splunkInfo },
      severity: level,
    };

    this.server.send(payload, (error) => {
      self.emit('logged');
      if (error) {
        // eslint-disable-next-line no-console
        console.error('splunk forward error', error);
        this.errorCount += 1;
      }
      callback(null, true);
    });
  }
}
