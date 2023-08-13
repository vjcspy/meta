export const getStockPriceJobId = (code: string) => {
  return `sync_stock_price_${code}`;
};
