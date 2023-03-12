import find from 'lodash/find';
import forEach from 'lodash/forEach';

export const getListCategoryIdsFromSelections = (selections: any[]) => {
  const ids: string[] = [];

  forEach(selections, (s) => {
    if (s.action?.type === 'catalog_category_view') {
      if (Array.isArray(s.action.data)) {
        const c = find(s.action.data, (dF) => dF.code === 'category_id');

        if (c) {
          if (c.data.eq) {
            ids.push(c.data.eq);
          } else if (c.data.in) {
            // @ts-ignore
            ids.push(...c.data.in);
          }
        }
      }
    }
    if (Array.isArray(s.selections)) {
      ids.push(...getListCategoryIdsFromSelections(s.selections));
    }
  });

  return ids;
};
