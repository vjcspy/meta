/* eslint-disable no-param-reassign */
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { format } from '@redtea/format-axios-error';
import { AxiosError } from 'axios';

import type { AbstractContext } from '../context/AbstractContext';
import { xAppContext } from '../context/XAppContext';

export class XLogger {
  private _logger: NestLogger;

  constructor(
    private context: string,
    /**
     * @deprecated Since version x.x.x. Please don't pass this property
     */
    private appContext?: AbstractContext,
  ) {
    this._logger = new NestLogger(this.context);
  }

  debug(message: any, metadata?: Record<string, any>): void {
    metadata = this._injectContext(metadata);
    if (metadata) {
      this._logger.debug(message, metadata);
    } else {
      this._logger.debug(message);
    }
  }

  /**
   *
   * @param message
   * @param error
   * @param metadata
   */
  error(message: any, error: Error, metadata?: Record<string, any>): void {
    metadata = this._injectContext(metadata);

    if (error instanceof AxiosError) {
      const errorMeta = format(error);
      delete error.config;
      delete error.request;
      delete error.response;

      metadata = { ...metadata, ...errorMeta };
    }

    if (metadata) {
      this._logger.error(message, error, metadata);
    } else {
      this._logger.error(message, error);
    }
  }

  /**
   *
   * @param message
   * @param metadata
   */
  log(message: any, metadata?: Record<string, any>): void {
    metadata = this._injectContext(metadata);

    if (metadata) {
      this._logger.log(message, metadata);
    } else {
      this._logger.log(message);
    }
  }

  /**
   *
   * @param message
   * @param metadata
   */
  info(message: any, metadata?: Record<string, any>): void {
    this.log(message, metadata);
  }

  verbose(message: any, metadata: Record<string, any>): void {
    if (metadata) {
      this._logger.verbose(message, metadata);
    } else {
      this._logger.verbose(message);
    }
  }

  warn(message: any, metadata?: Record<string, any>): void {
    metadata = this._injectContext(metadata);
    if (metadata) {
      this._logger.warn(message, metadata);
    } else {
      this._logger.warn(message);
    }
  }

  private _injectContext(metadata?: Record<string, any>) {
    if (xAppContext().getXCorrelationId()) {
      if (typeof metadata === 'undefined') {
        metadata = {};
      }

      // metadata.xCorrelationId = xAppContext().getXCorrelationId();
      // metadata.isUserRequest = xAppContext().isUserRequest();
    }

    return metadata;
  }
}
