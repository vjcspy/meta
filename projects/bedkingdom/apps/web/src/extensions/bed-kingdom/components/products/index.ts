import {
  ExtensionConfig,
  ExtensionCustomizeType,
  ExtensionType,
} from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BED_KINGDOM_PRODUCTS_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'PRODUCTS',
    component: dynamic(() => import('./Products')),
    customizeType: ExtensionCustomizeType.HOOK,
    structure: [
      {
        title: 'products stack',
        hookId: 'products',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.COMPONENT,
      },
    ],
    priorityFn: () => 90,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION',
    component: dynamic(() => import('./Aggregation')),
    priorityFn: () => 90,
  },
  {
    uiId: 'PRODUCTS_FILTER',
    component: dynamic(() => import('./Filter')),
    priorityFn: () => 90,
  },
  {
    uiId: 'PRODUCTS_AGGREGATIONS',
    uiTags: ['PRODUCTS_AGGREGATIONS'],
    component: dynamic(() => import('./Aggregations')),
    priorityFn: () => 90,
  },
  {
    uiId: 'BED_KINGDOM_FILTER_MOBILE',
    uiTags: ['BED_KINGDOM_FILTER_MOBILE'],
    component: dynamic(() => import('./AggregationMobile')),
    priorityFn: () => 90,
  },
  {
    uiId: 'BED_KINGDOM_FILTER_ITEM_MOBILE',
    uiTags: ['BED_KINGDOM_FILTER_ITEM_MOBILE'],
    component: dynamic(() => import('./AggregationItemMobile')),
    priorityFn: () => 90,
  },
  {
    uiId: 'PRODUCTS_CATEGORY_INFO',
    uiTags: ['PRODUCTS_CATEGORY_INFO'],
    component: dynamic(() => import('./CategoryInfo')),
    priorityFn: () => 90,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION_MULTISELECT',
    uiTags: ['PRODUCTS_AGGREGATION_MULTISELECT'],
    component: dynamic(() => import('./AggregationMultiselect')),
    priorityFn: () => 90,
  },
  {
    uiId: 'PRODUCTS_AGGREGATION_SELECT',
    uiTags: ['PRODUCTS_AGGREGATION_SELECT'],
    component: dynamic(() => import('./AggregationSelect')),
    priorityFn: () => 90,
  },
];
