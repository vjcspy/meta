import { format } from '@web/base';
import { CacheFile } from 'chitility/dist/util/cache-file';
import { proxyRequest } from 'chitility/dist/util/proxy-request';
import { Registry } from 'chitility/dist/util/registry';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';

import { WEB_DOMAIN_KEY } from '../etc/WebDomainKey';

const INCLUDE_STORE_CODE_IN_URL = false;

export class DomainManager {
  /**
   * CHÚ Ý: @TODO
   * Vì nextjs chạy liên tục trên 1 tiến trình nên mỗi khi render data sẽ được giữ lại
   * Ví dụ như ở đây khi gọi hàm getNumber() được giữ lại cho các request
   * Trong khi mình có thể handle nhiều domain trên cùng 1 instance
   * Nên nếu muốn cache data phải chú ý chia theo domain
   * @type {number}
   */
  static checkKeep: number;
  protected static _instance: DomainManager;

  protected static _cachedData: any = {};
  protected static currentDomainData: {
    defaultStore: any;
    stores: any[];
    websites: any[];
  };

  public static getInstance(): DomainManager {
    if (!DomainManager._instance) {
      DomainManager._instance = new DomainManager();
    }

    return DomainManager._instance;
  }

  /**
   *
   * @param domain
   * @returns {Promise<any>}
   */
  public async resolveDomainData(domain: string): Promise<any> {
    const domainDataCacheKey = WEB_DOMAIN_KEY.DOMAIN_DATA + '_' + domain;
    const cachedDomainData = await CacheFile.get(domainDataCacheKey, 'global');

    if (cachedDomainData) {
      DomainManager.currentDomainData = cachedDomainData;
      return cachedDomainData;
    }

    // get websiteIds by domain from k-api
    const domainConfigData = await this.getConfigDataFromDomain(domain);
    // get websites data from graphpl
    const websites = await this.getWebsitesDataFromPCMS(
      domainConfigData.websiteIds
    );

    if (!websites) {
      throw new Error('Could not found websites data');
    }

    DomainManager.currentDomainData = {
      ...domainConfigData,
      websites,
      defaultStore: domainConfigData.storeId
        ? this.retrieveStore(domainConfigData.storeId, websites) ??
          this.retrieveDefaultStoreFromWebsites(websites)
        : this.retrieveDefaultStoreFromWebsites(websites),
      stores: this.retrieveActiveStoreFromWebsites(websites),
    };

    await CacheFile.save(
      domainDataCacheKey,
      DomainManager.currentDomainData,
      'global'
    );

    Registry.getInstance().register(
      domainDataCacheKey,
      DomainManager.currentDomainData
    );

    return DomainManager.currentDomainData;
  }

  /**
   *  Lấy được current storeCode với url hiện tại
   * @param url
   * @param defaultStore
   * @param stores
   * @returns {{urlHasStoreCode: boolean, currentStore: any, pathname: string} | {urlHasStoreCode: boolean, currentStore: any, pathname: string}}
   */
  resolveUrl(
    url: string,
    defaultStore?: any,
    stores?: any
  ): {
    currentStore: any;
    pathname: string;
    urlHasStoreCode: boolean;
  } {
    if (!defaultStore) {
      if (!DomainManager.currentDomainData?.defaultStore) {
        throw new Error(
          'Domain không được load đầu tiên hoặc không có dữ liệu website'
        );
      }
      defaultStore = DomainManager.currentDomainData.defaultStore;
    }
    if (!stores) {
      if (!DomainManager.currentDomainData?.stores) {
        throw new Error(
          'Domain không được load đầu tiên hoặc không có dữ liệu website'
        );
      }
      stores = DomainManager.currentDomainData.stores;
    }

    if (url === '' || url === 'index') {
      // home page
      return {
        currentStore: defaultStore,
        pathname: 'index',
        urlHasStoreCode: false,
      };
    }

    const regex = new RegExp('^([a-zA-Z]*)\\/(.*)', 'g');
    const r = regex.exec(url);

    let currentStore: any;
    let resolveUrl: string = url;
    let urlHasStoreCode = false;
    if (r && r.length === 3) {
      // gia su da co store code, can check store code co dung khong.
      currentStore = stores.find((s: any) => !!r[1] && s['code'] === r[1]);

      if (INCLUDE_STORE_CODE_IN_URL && currentStore) {
        // Url chứa store code
        resolveUrl = r[2];
        urlHasStoreCode = true;
      } else {
        // Nếu không tồn tại store thì coi như url không chưa store code
        currentStore = defaultStore;
      }
    } else {
      // check xem có phải là homepage không?
      currentStore = stores.find((s: any) => s['code'] === url);

      if (INCLUDE_STORE_CODE_IN_URL && currentStore) {
        // là homepage:
        resolveUrl = '';
        urlHasStoreCode = true;
      } else {
        currentStore = defaultStore;
      }
    }

    return {
      currentStore,
      pathname: resolveUrl,
      urlHasStoreCode,
    };
  }

  /**
   * TODO: sẽ phải lấy từ k-api nhưng chưa làm
   * @see https://chiaki.atlassian.net/browse/KP-79
   *
   * @param domain
   * @returns {{shopOwnerId: string, domain: string, websiteIds: number[]}}
   */
  protected async getConfigDataFromDomain(domain: string): Promise<any> {
    if (typeof domain !== 'string' || isEmpty(domain)) {
      throw new Error('domain data must be valid string');
    }

    if (typeof DomainManager._cachedData.fromApiConfigDomainData !== 'object') {
      DomainManager._cachedData.fromApiConfigDomainData = {};
    }

    if (DomainManager._cachedData.fromApiConfigDomainData?.domain) {
      return DomainManager._cachedData.fromApiConfigDomainData.domain;
    } else {
      // process request to get data
      const domainData = {
        domain,
        websiteIds: Registry.getInstance().registry('DEFAULT_WEBSITE_IDS'),
        shopOwnerId: 'default',
        // Nếu chỉ định luôn storeId thì domain sẽ force sử dụng dữ liệu của store này,
        // còn không thì sẽ lấy theo default store1
        storeId: null,
      };

      // save to cache;
      DomainManager._cachedData.fromApiConfigDomainData.domain = domainData;

      return domainData;
    }
  }

  /**
   * TODO: cần phải có cơ chế cache cho cả 2 t/h CSR và SSR
   * @param websiteIds
   * @returns {Promise<any>}
   */
  protected async getWebsitesDataFromPCMS(websiteIds: string[]): Promise<any> {
    try {
      const CACHE_KEY = 'WEBSITES_DATA_FROM_PCMS_' + websiteIds.join('_');
      const cachedPcmsData = await CacheFile.get(CACHE_KEY);
      if (cachedPcmsData) {
        return cachedPcmsData;
      }
      const data: any = await proxyRequest({
        type: 'get-websites',
        payload: {
          website_ids: websiteIds,
        },
      });

      console.log(format.context('getWebsitesDataFromPCMS'), data);

      if (data && data.hasOwnProperty('rows')) {
        await CacheFile.save(CACHE_KEY, data['rows']);
        return data['rows'];
      }
    } catch (e) {
      console.log(e);
      console.error('Could not get websites data from pcms');
    }

    return undefined;
  }

  protected retrieveActiveStoreFromWebsites(websites: any[]): any[] {
    const stores: any[] = [];
    forEach(websites, (w) => {
      forEach(w['groups'], (g) => {
        forEach(g['stores'], (s) => {
          if (s['is_active'] == '1' || s['is_active'] === true) {
            stores.push({ ...s });
          }
        });
      });
    });

    return stores;
  }

  protected retrieveDefaultStoreFromWebsites(websites: any[]): any | undefined {
    let defaultStore = undefined;
    let defaultWebsite = websites.find((w) => w['is_default'] === true);

    if (!defaultWebsite && websites.length > 0) {
      defaultWebsite = websites[0];
    }

    if (defaultWebsite) {
      const defaultGroupId = defaultWebsite['default_group_id'];
      let defaultGroup;

      if (defaultGroupId) {
        defaultGroup = defaultWebsite['groups'].find(
          (g: any) => g['id'] == defaultGroupId
        );
      }

      if (!defaultGroup && defaultWebsite['groups'].length > 0) {
        defaultGroup = defaultWebsite['groups'][0];
      }

      if (!defaultGroup) {
        return defaultStore;
      }

      const defaultStoreId = defaultGroup['default_store_id'];
      if (defaultStoreId) {
        defaultStore = defaultGroup['stores'].find(
          (s: any) => s['id'] == defaultStoreId
        );
      }

      if (!defaultStore && defaultGroup['stores'].length > 0) {
        defaultStore = defaultGroup['stores'][0];
      }
    }
    return defaultStore;
  }

  protected retrieveStore(storeId: any, websites: any[]): any | undefined {
    let storeData;
    if (Array.isArray(websites)) {
      forEach(websites, (website: any) => {
        if (Array.isArray(website['groups'])) {
          forEach(website.groups, (group: any) => {
            if (Array.isArray(group['stores'])) {
              const store = group.stores.find((s: any) => s['id'] == storeId);

              if (store) {
                storeData = store;

                return false;
              }
            }
          });
        }
      });
    }

    return storeData;
  }
}
