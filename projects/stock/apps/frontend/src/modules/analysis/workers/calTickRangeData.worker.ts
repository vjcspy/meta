import { calTickRangeData } from '@modules/analysis/util/ticks/calTickRangeData';

addEventListener('message', (event) => {
  postMessage(calTickRangeData(event.data));
});

// addEventListener('messageerror', () => {
//   postMessage('messageerror');
// });
