let path: any;
let fs: any;

if (typeof window === 'undefined') {
  fs = require('fs');
  path = require('path');
}

const CACHE_PATH: string = process.env.CACH_FILE_PATH ?? '_cache/chitility';

export class CacheFile {
  private static _CACHE_DATA: any = {};

  static async save(key: string, value: any, userId = 'default') {
    if (typeof window !== 'undefined') {
      return;
    }

    if (typeof key !== 'string') {
      throw new Error('key must be string');
    }

    if (typeof value !== 'object') {
      throw new Error('value must be object');
    }

    try {
      const valueString = JSON.stringify(value);
      await CacheFile._saveFile(
        CacheFile._getFilePathByKey(key, userId),
        valueString
      );
    } catch (e) {
      console.error('Could not save data to cache for ' + key);
      console.error(e);
    }
  }

  static async get(key: string, userId = 'default') {
    if (typeof window !== 'undefined') {
      return undefined;
    }

    if (CacheFile._CACHE_DATA.hasOwnProperty(key)) {
      console.info('found cache for key ' + key);
      return CacheFile._CACHE_DATA[key];
    }

    try {
      const stringValue = await CacheFile._getFile(
        CacheFile._getFilePathByKey(key, userId)
      );
      if (stringValue) {
        console.info('found cache file for key ' + key);
        const data = JSON.parse(stringValue);
        if (typeof data === 'object') {
          CacheFile._CACHE_DATA[key] = data;
          return data;
        }
        return undefined;
      } else {
        return undefined;
      }
    } catch (e) {
      console.error('Could not get cache for ' + key);
      console.error(e);
    }

    return undefined;
  }

  private static _getFilePathByKey(key: string, store = 'default') {
    const pathFile = `${CACHE_PATH}/${store}/${key}.json`;

    return path.join(process.cwd(), pathFile);
  }

  private static async _saveFile(filePath: string, value: string) {
    try {
      CacheFile.ensureDirectoryExistence(filePath);
      fs.writeFileSync(filePath, value);
    } catch (e) {
      console.error('Could not save data to cache file');
      console.error(e);
    }
  }

  private static async _getFile(filePath: string) {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch (e) {
      return undefined;
    }
  }

  private static ensureDirectoryExistence(filePath: string) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    CacheFile.ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }
}
