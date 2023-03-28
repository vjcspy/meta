import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const PRODUCTS_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'PRODUCTS',
    uiTags: ['PRODUCTS'],
    component: dynamic(() => import('./Products')),
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
    uiTags: ['PRODUCTS_BREADCRUMBS'],
    component: dynamic(() => import('./BreadCrumbs')),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_BREADCRUMBS_FOR_PAGE_SEARCH',
    uiTags: ['PRODUCTS_BREADCRUMBS_FOR_PAGE_SEARCH'],
    component: dynamic(() => import('./BreadCrumbsForSearch')),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_CATEGORY_INFO',
    uiTags: ['PRODUCTS_CATEGORY_INFO'],
    component: dynamic(() => import('./CategoryInfo')),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATIONS',
    uiTags: ['PRODUCTS_AGGREGATIONS'],
    component: dynamic(() => import('./Aggregations')),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION',
    uiTags: ['PRODUCTS_AGGREGATION'],
    component: dynamic(() => import('./Aggregation')),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION_MULTISELECT',
    uiTags: ['PRODUCTS_AGGREGATION_MULTISELECT'],
    component: dynamic(() => import('./AggregationMultiselect')),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION_SELECT',
    uiTags: ['PRODUCTS_AGGREGATION_SELECT'],
    component: dynamic(() => import('./AggregationSelect')),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION_PRICE',
    uiTags: ['PRODUCTS_AGGREGATION_PRICE'],
    component: dynamic(() => import('./AggregationPrice')),
    priorityFn: () => 100,
  },
  // TODO: Thêm các loại aggregation còn thiếu
  {
    uiId: 'PRODUCTS_FILTERS',
    component: dynamic(() => import('./Filters')),
    priorityFn: () => 100,
  },
  {
    uiId: 'PRODUCTS_FILTER',
    component: dynamic(() => import('./Filter')),
    priorityFn: () => 100,
  },
];
