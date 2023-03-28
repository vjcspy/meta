import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const HOME_MY_ORDERS_CONTENT_CFG: ExtensionConfig[] = [
  {
    uiId: 'BEDKINGDOM_ORDER_DETAILS',
    component: dynamic(() => import('./OrderDetails')),
  },
  {
    uiId: 'BEDKINGDOM_ORDER_DETAILS_TAB_INVOICE',
    component: dynamic(() => import('./OrderDetailsTabInvoice')),
  },
  {
    uiId: 'BEDKINGDOM_ORDER_DETAILS_TAB_SHIPMENT',
    component: dynamic(() => import('./OrderDetailsTabShipment')),
  },
  {
    uiId: 'BEDKINGDOM_ORDER_DETAILS_PRINT_ORDER',
    component: dynamic(() => import('./OrderDetailsPrintOrder')),
  },
];
