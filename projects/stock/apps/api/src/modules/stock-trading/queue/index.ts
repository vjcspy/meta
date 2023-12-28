import { MarketTickActionConsumer } from '@modules/stock-trading/queue/consumer/market-tick-action.consumer';
import { MarketTickAnalyzeHistoryConsumer } from '@modules/stock-trading/queue/consumer/market-tick-analyze-history.consumer';
import { MarketTickActionAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-action-analyze.publisher';
import { MarketTickHistoryAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-history-analyze.publisher';
import { StockTradingAnalysisPublisher } from '@modules/stock-trading/queue/publisher/stock-trading-analysis.publisher';

export const TRADING_QUEUE = [
  StockTradingAnalysisPublisher,
  MarketTickActionAnalyzePublisher,
  MarketTickActionConsumer,
  MarketTickHistoryAnalyzePublisher,
  MarketTickAnalyzeHistoryConsumer,
];
