import type { MarketSymbolCategory } from '@modules/analysis/types';
import moment from 'moment/moment';

export interface AnalysisState {
  cors?: any[];

  /* __________ Du lieu cua symbol dang xem __________*/
  symbol?: string;
  fromDate: string;
  toDate: string;
  prices?: any[];
  tickIntraDay?: any;
  ticks?: any[];
  tradeValueFilter: number[]; // Trade value filter for each lenh mua hoac ban

  /*__________ analysis table data __________*/
  analysisTableData?: any[];
  capFilter?: number;
  marketCategories?: MarketSymbolCategory[];
  selectedMarketCat?: MarketSymbolCategory;
  marketFromDate: string;
  marketToDate: string;
}
export const analysisInitialState: AnalysisState = {
  fromDate: moment().utc().subtract(10, 'days').format('YYYY-MM-DD'),
  toDate: moment().utc().format('YYYY-MM-DD'),
  tradeValueFilter: [0, 250, 1000],

  /* __________ market __________ */
  marketFromDate: moment().utc().subtract(90, 'days').format('YYYY-MM-DD'),
  marketToDate: moment().utc().format('YYYY-MM-DD'),
};
