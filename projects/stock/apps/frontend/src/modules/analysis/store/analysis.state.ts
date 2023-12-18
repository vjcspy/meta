import type { MarketSymbolCategory } from '@modules/analysis/types';
import { getLatestWorkingDay } from '@modules/analysis/util/moment/getLatestWorkingDay';
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
  fromDate: moment(getLatestWorkingDay())
    .subtract(3, 'months')
    .format('YYYY-MM-DD'),
  toDate: getLatestWorkingDay(),
  tradeValueFilter: [0, 250, 1000],

  /* __________ market __________ */
  marketFromDate: moment(getLatestWorkingDay())
    .subtract(3, 'months')
    .format('YYYY-MM-DD'),
  marketToDate: getLatestWorkingDay(),
};
