import moment from 'moment/moment';

export interface AnalysisState {
  cors?: any[];
  symbol?: string;
  fromDate: string;
  toDate: string;
  prices?: any[];
  ticks?: any[];
  tickIntraDay?: any;
  tickDayFromData?: string;
  tradeValueFilter: number[]; // Trade value for each lenh mua hoac ban
  capFilter?: number;
  analysis?: any[];
  hullma_intra_day?: {
    fromDate: string;
    toDate: string;
    hullma5?: any[];
    hullma15?: any[];
    hullma30?: any[];
  };
}
export const analysisInitialState: AnalysisState = {
  fromDate: moment().utc().subtract(10, 'days').format('YYYY-MM-DD'),
  toDate: moment().utc().format('YYYY-MM-DD'),
  tradeValueFilter: [0, 250, 1000],
};
