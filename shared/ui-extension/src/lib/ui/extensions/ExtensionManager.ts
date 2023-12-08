/* eslint-disable no-param-reassign */
import { Map } from 'immutable';

import type { ExtensionConfig } from '../../types';

function getPriority(c: any) {
  let cP = 100;
  if (c.hasOwnProperty('priority')) {
    if (typeof c.priority === 'number') {
      cP = c.priority;
    } else if (typeof c.priority === 'function') {
      cP = c.priority();
    }
  }

  if (c.hasOwnProperty('priorityFn')) {
    if (typeof c.priorityFn === 'number') {
      cP = c.priorityFn;
    } else if (typeof c.priorityFn === 'function') {
      cP = c.priorityFn();
    }
  }
  return cP;
}

export class ExtensionManager {
  static COMPONENTS: Map<string, ExtensionConfig> = Map<any, any>();

  protected static INSTANCE: any;

  static getInstance(): ExtensionManager {
    if (typeof ExtensionManager.INSTANCE === 'undefined') {
      ExtensionManager.INSTANCE = new ExtensionManager();
    }

    return ExtensionManager.INSTANCE;
  }

  config(configs: ExtensionConfig | ExtensionConfig[]): ExtensionManager {
    if (!Array.isArray(configs)) {
      configs = [configs];
    }
    configs.forEach((c: ExtensionConfig) => {
      c.priority = c.priority ?? 100;
      // merge data if you have more than one config
      if (ExtensionManager.COMPONENTS.has(c.uiId)) {
        const sortedToMerge: any[] = [
          c,
          ExtensionManager.COMPONENTS.get(c.uiId),
        ];
        // eslint-disable-next-line @typescript-eslint/no-shadow
        sortedToMerge.sort((c: any, b: any) => {
          return getPriority(c) - getPriority(b);
        });

        /*
         * TODO:
         * Idea ở đây là có thể khai báo nhiều nơi sau đó merge tất cả các khai báo lại
         * với trường hợp hoc thì đã nghĩ tới việc có thể là 1 object {ten_hoc: false} thì sẽ remove hoc
         * Tuy nhiên cho đến thời điểm hiện tại chưa sử dụng kiểu merge này.
         * Thay vào đó là override luôn component dựa vào priority
         * */

        /* ĐÂY LÀ CÁCH SỬ DỤNG MERGE,
         *  Sau này có thể sẽ phải sử dụng cách này để implement cơ chế override khác
         * */
        // const hocs: any[] = [
        //   ...(c.hoc ?? []),
        //   // ...(ExtensionManager.COMPONENTS.get(c.uiId)!.hoc ?? []),
        // ];
        // // @ts-ignore
        // c = _.merge(...sortedToMerge);
        // c.hoc = hocs;

        /* CHUYỂN QUA LẤY LUÔN THEO PRIORITY */
        // eslint-disable-next-line prefer-destructuring
        c = sortedToMerge[0];
      }

      /*
       * resolve HOC data
       * Sử dụng cách gọi hoc mới từ 1.0.5
       */
      // c.hoc = HOCManager.getInstance().resolveExtensionHOCs(c.hoc);

      ExtensionManager.COMPONENTS = ExtensionManager.COMPONENTS.set(c.uiId, c);
    });

    return this;
  }

  cptCfg(uiId: string): ExtensionConfig | undefined {
    return ExtensionManager.COMPONENTS.get(uiId);
  }
}
