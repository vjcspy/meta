import forEach from 'lodash/forEach';

/**
 * Lấy ra breadcrumbs của product dựa vào category hiện tại
 *
 * @param category
 * @returns {{name: string, path: string}[]}
 */
export const resolveProductBreadcrumbs = (category: any) => {
  const breadcrumbs: {
    name: string;
    path: string;
  }[] = [];

  if (category?.url_path && category?.name && category?.url_suffix) {
    const suffix = category.url_suffix;

    if (category.breadcrumbs && Array.isArray(category.breadcrumbs)) {
      forEach(category.breadcrumbs, (b) => {
        breadcrumbs.push({
          name: b.category_name,
          path: b.category_url_path + suffix,
        });
      });
    }

    breadcrumbs.push({
      name: category?.name,
      path: category.url_path + suffix,
    });
  }

  return breadcrumbs;
};
