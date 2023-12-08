import { Map } from 'immutable';

import type { UiHOC } from '../../types';

export class HOCManager {
  protected static INSTANCE: HOCManager;

  protected static hocs: Map<string, UiHOC> = Map<any, any>();

  public static getInstance(): HOCManager {
    if (typeof HOCManager.INSTANCE === 'undefined') {
      console.info(
        '______________________________________ Create HOCManager ______________________________________',
      );
      HOCManager.INSTANCE = new HOCManager();
    }

    return HOCManager.INSTANCE;
  }

  addHOC(hocName: string, uiHOC: UiHOC): HOCManager {
    HOCManager.hocs = HOCManager.hocs.set(hocName, uiHOC);

    return this;
  }

  getByName(hocName: string): UiHOC | undefined {
    return HOCManager.hocs.get(hocName);
  }

  // eslint-disable-next-line unused-imports/no-unused-vars,@typescript-eslint/no-unused-vars
  configHOCs(_: UiHOC[]) {
    // TODO: implement if needed
  }

  /**
   * @param hoc
   * @returns {any[]}
   */
  // resolveExtensionHOCs(hoc?: (HOCConfig | string)[]): string[] {
  //   let finalHOCs: string[] = [];
  //
  //   if (Array.isArray(hoc)) {
  //     hoc = _.chain(hoc)
  //       .sortBy((h: any) => {
  //         if (typeof h === 'object' && h['priority']) {
  //           return h.priority;
  //         }
  //         return 0;
  //       })
  //       .uniq()
  //       .value();
  //
  //     _.forEach(hoc, (h: any) => {
  //       if (_.isString(h)) {
  //         finalHOCs.push(h);
  //       } else if (typeof h === 'object') {
  //         if (h['type']) {
  //           if (h.type === 'remove' && h['name']) {
  //             finalHOCs = _.filter(finalHOCs, (fH: any) => fH !== h.name);
  //           }
  //           if (h.type === 'add' && !h['before'] && !h['after'] && h['name']) {
  //             finalHOCs.push(h['name']);
  //           }
  //         }
  //       }
  //     });
  //     _.forEach(hoc, (h: any) => {
  //       if (h['type'] && h.type === 'add' && h['name']) {
  //         if (h['before']) {
  //           const index = _.findIndex(finalHOCs, (fH) => fH === h['before']);
  //           if (index > -1) {
  //             finalHOCs.splice(index, 0, h['name']);
  //           }
  //         } else if (h['after']) {
  //           const index = _.findIndex(finalHOCs, (fH) => fH === h['after']);
  //           if (index > -1) {
  //             finalHOCs.splice(index + 1, 0, h['name']);
  //           }
  //         }
  //       }
  //     });
  //   }
  //
  //   return finalHOCs;
  // }
}
