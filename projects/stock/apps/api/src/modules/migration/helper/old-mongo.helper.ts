import { XLogger } from '@nest/base/dist';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Injectable()
export class OldMongoHelper {
  private readonly logger = new XLogger(OldMongoHelper.name);

  private _inited = false;

  private _client: MongoClient;

  constructor(private configService: ConfigService) {}

  initClient() {
    if (!this._inited) {
      const uri = this.configService.get<string>('MONGODB_OLD_URI');
      if (typeof uri === 'string' && uri.length > 1) {
        this._client = new MongoClient(uri);
      } else {
        this.logger.warn('Could not init MongoClient');
      }

      this._inited = true;
    }
  }

  getClient() {
    if (!this._inited) {
      this.initClient();
    }

    return this._client;
  }
}
