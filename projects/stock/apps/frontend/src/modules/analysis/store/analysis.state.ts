import type { MarketSymbolCategory } from '@modules/analysis/types';
import { getLatestWorkingDay } from '@modules/analysis/util/moment/getLatestWorkingDay';
import { TimeResolution } from '@stock/packages-com/dist/tick/merge-by-res';
import moment from 'moment/moment';

export interface AnalysisState {
  cors?: any[];
  vnindexes?: any[];

  /* __________ Du lieu cua symbol dang xem __________*/
  symbol?: string;
  fromDate: string;
  toDate: string;
  prices?: any[];
  tickIntraDay?: any;
  ticks?: any[];
  tradeValueFilter: number[]; // Trade value filter for each lenh mua hoac ban
  timeRes: TimeResolution;

  /*__________ analysis table data __________*/
  analysisTableData?: any[];
  capFilter?: number;
  marketCategories?: MarketSymbolCategory[];
  selectedMarketCat?: MarketSymbolCategory;
  marketFromDate: string;
  marketToDate: string;

  /* intra-day speed*/
  intraDaySpeedSymbol?: string;
  intraDaySpeedData?: any;
}
export const analysisInitialState: AnalysisState = {
  fromDate: moment(getLatestWorkingDay())
    .subtract(3, 'months')
    .format('YYYY-MM-DD'),
  toDate: getLatestWorkingDay(),
  tradeValueFilter: [0, 400, 10000],
  timeRes: TimeResolution['3M'],

  /* __________ market __________ */
  marketFromDate: moment(getLatestWorkingDay())
    .subtract(3, 'months')
    .format('YYYY-MM-DD'),
  marketToDate: getLatestWorkingDay(),
};
