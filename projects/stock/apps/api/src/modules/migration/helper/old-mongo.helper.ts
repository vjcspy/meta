import { XLogger } from '@nest/base/dist';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Db } from 'mongodb';
import { MongoClient } from 'mongodb';

@Injectable()
export class OldMongoHelper {
  private readonly logger = new XLogger(OldMongoHelper.name);

  private _inited = {
    default: false,
    v4: false,
  };

  private _client: Record<string, MongoClient> = {};

  private _database: Record<string, Db> = {};

  constructor(private configService: ConfigService) {}

  initClient(version: 'default' | 'v4' = 'default') {
    if (!this._inited[version]) {
      let uri = '';
      if (version === 'default') {
        uri = this.configService.get<string>('MONGODB_OLD_URI_V6');
      } else {
        uri = this.configService.get<string>('MONGODB_OLD_URI_V4');
      }

      if (typeof uri === 'string' && uri.length > 1) {
        this._client[version] = new MongoClient(uri);
      } else {
        this.logger.warn('Could not init MongoClient');
      }

      this._inited[version] = true;
    }
  }

  getClient(version: 'default' | 'v4' = 'default') {
    if (!this._inited[version]) {
      this.initClient(version);
    }

    return this._client[version];
  }

  getDatabase(version: 'default' | 'v4' = 'default') {
    if (!this._database[version]) {
      const client = this.getClient(version);
      this._database[version] = client.db('nstock');
    }
    return this._database[version];
  }
}
