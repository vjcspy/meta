import { calTickPriceSummary } from '@modules/analysis/util/ticks/calTickPriceSummary';

addEventListener('message', (event) => {
  postMessage(calTickPriceSummary(event.data));
});

addEventListener('messageerror', () => {
  postMessage('messageerror');
});
