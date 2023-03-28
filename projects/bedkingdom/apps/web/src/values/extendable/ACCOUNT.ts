import { DataValueExtension } from 'chitility/dist/lib/extension/data-value-extension';

export default DataValueExtension.resolve('ACCOUNT', {
  DEFAULT_USERNAME: 'roni_cost@example.com',
  DEFAULT_PASSWORD: 'roni_cost3@example.com',
  MY_ORDER_STATUS: [
    { title: 'Tất cả', value: 'all' },
    { title: 'Chờ xác nhận', value: 'pending' },
    { title: 'Chờ lấy hàng', value: 'waiting_to_pickup' },
    { title: 'Đang giao', value: 'delivery' },
    { title: 'Đã giao', value: 'complete' },
    { title: 'Đã huỷ', value: 'canceled,close' },
  ],
});
