import { AnalysisConsumer } from '@modules/stock-trading/queue/consumer/analysis.consumer';
import { MarketTickActionConsumer } from '@modules/stock-trading/queue/consumer/market-tick-action.consumer';
import { MarketTickAnalyzeHistoryConsumer } from '@modules/stock-trading/queue/consumer/market-tick-analyze-history.consumer';
import { MarketTickDayAnalyzeConsumer } from '@modules/stock-trading/queue/consumer/market-tick-day-analyze.consumer';
import { MarketTickActionAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-action-analyze.publisher';
import { MarketTickActionDayAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-action-day-analyze.publisher';
import { MarketTickHistoryAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-history-analyze.publisher';
import { StockTradingAnalysisPublisher } from '@modules/stock-trading/queue/publisher/stock-trading-analysis.publisher';

export const TRADING_QUEUE = [
  StockTradingAnalysisPublisher,
  MarketTickActionAnalyzePublisher,
  MarketTickActionConsumer,
  MarketTickHistoryAnalyzePublisher,
  MarketTickAnalyzeHistoryConsumer,
  MarketTickActionDayAnalyzePublisher,
  MarketTickDayAnalyzeConsumer,
  AnalysisConsumer,
];
