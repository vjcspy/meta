import React, { useMemo } from 'react';

import type { UiComponent } from '../../types';
import { HOCManager } from '../hoc';

export const withUiHOC = (
  OrgComponent: UiComponent<any>,
  hoc: string[]
): UiComponent<any> => {
  return React.memo((props: any) => {
    const ComponentWithHoc = useMemo(() => {
      // hoc lúc này đã được config thành 1 array chỉ việc reducer theo thứ tự. Bước config hoc sẽ nằm lúc config data
      return hoc.reverse().reduce((result, value) => {
        const hocFN = HOCManager.getInstance().getByName(value);
        if (typeof hocFN !== 'function') {
          console.error('We could not found hoc with name: ' + value);
          return result;
        } else {
          return hocFN(result, props);
        }
      }, OrgComponent);
    }, [hoc]);

    return <ComponentWithHoc {...props} />;
  });
};
