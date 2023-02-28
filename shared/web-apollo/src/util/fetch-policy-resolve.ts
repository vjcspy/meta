import type { WatchQueryFetchPolicy } from '@apollo/client';
import { NamespacedLocalStorage } from '@web/base/dist/lib/persistent/NamespacedLocalStorage';
import { isSSR } from '@web/base/dist/util/isSSR';

export class FetchPolicyResolve {
  static CACHE_AND_NETWORK: WatchQueryFetchPolicy = 'cache-and-network';
  static DEFAULT: WatchQueryFetchPolicy = 'cache-first';
  static CACHE_ONLY: WatchQueryFetchPolicy = 'cache-only';
  static NETWORK_ONLY: WatchQueryFetchPolicy = 'network-only';
  static NO_CACHE: WatchQueryFetchPolicy = 'no-cache';
  static STANDBY: WatchQueryFetchPolicy = 'standby';

  /**
   *
   * @param key
   * @param ttl Life time cache(second)
   * @returns {string}
   */
  static withLifetime(key: string, ttl = 24 * 60 * 60): WatchQueryFetchPolicy {
    if (this.getPersistent() !== null) {
      const _d = this.getPersistent()?.getItem(key);
      if (_d) {
        const { timeStored } = JSON.parse(_d);
        const now = Date.now();

        return now - timeStored > ttl * 1000
          ? FetchPolicyResolve.CACHE_AND_NETWORK
          : FetchPolicyResolve.DEFAULT;
      } else {
        this.getPersistent()?.setItem(
          key,
          JSON.stringify({
            timeStored: Date.now(),
          })
        );
      }
    }

    return FetchPolicyResolve.CACHE_AND_NETWORK;
  }

  protected static _persistent: NamespacedLocalStorage | null;
  protected static getPersistent() {
    if (typeof FetchPolicyResolve._persistent === 'undefined') {
      if (!isSSR() && typeof window?.localStorage !== 'undefined') {
        FetchPolicyResolve._persistent = new NamespacedLocalStorage(
          window.localStorage,
          'APOLLO_CACHE_TTL'
        );
      } else {
        FetchPolicyResolve._persistent = null;
      }
    }

    return FetchPolicyResolve._persistent;
  }
}
