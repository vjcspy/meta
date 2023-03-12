import { PRICE_CPT } from '@main/ui-storefront/src/modules/catalog/components/price';
import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const UI_STOREFRONT_CATALOG_EXT_CFG: ExtensionConfig[] = [
  ...PRICE_CPT,
  // __________________________ PRODUCTS __________________________
  {
    uiId: 'PRODUCTS',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/Products'
        )
    ),
    hoc: ['withWebProductsContainer', 'withStoreFiltersData'],
    customizeType: ExtensionCustomizeType.HOOK,
    structure: [
      {
        title: 'products stack',
        hookId: 'products',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.HEAD_COMPONENT,
      },
    ],
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_BREADCRUMBS',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/BreadCrumbs'
        )
    ),
    hoc: ['withCategoryData', 'withRouterWithStoreActions'],
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_CATEGORY_INFO',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/CategoryInfo'
        )
    ),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATIONS',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/Aggregations'
        )
    ),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/Aggregation'
        )
    ),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_FILTERS',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/Filters'
        )
    ),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_FILTER',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/Filter'
        )
    ),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION_MULTISELECT',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/AggregationMultiselect'
        )
    ),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION_SELECT',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/AggregationSelect'
        )
    ),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION_PRICE',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/AggregationPrice'
        )
    ),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION_SWATCH_VISUAL',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/AggregationSwatchVisual'
        )
    ),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION_SWATCH_TEXT',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/products/AggregationSwatchText'
        )
    ),
    priorityFn: () => 100,
  },

  //  __________________________ PRODUCT LISTING __________________________
  {
    uiId: 'PRODUCT_LISTING',
    uiTags: ['PRODUCT_LISTING'],
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/product-listing/ProductListing'
        )
    ),
    priorityFn: () => 99,
  },
  {
    uiId: 'PRODUCT_LISTING_ITEM',
    uiTags: ['PRODUCT_LISTING_ITEM'],
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/product-listing/ProductListingItem'
        )
    ),
    priorityFn: () => 99,
  },
  {
    uiId: 'PRODUCT_LISTING_ITEM_SIMPLE',
    uiTags: ['PRODUCT_LISTING_ITEM_SIMPLE'],
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/product-listing/ProductListingItemSimple'
        )
    ),
    priorityFn: () => 99,
  },
  {
    uiId: 'PRODUCT_LISTING_ITEM_CONFIGURABLE',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/catalog/components/product-listing/ProductListingItemConfigurable'
        )
    ),
    priorityFn: () => 99,
  },
];
