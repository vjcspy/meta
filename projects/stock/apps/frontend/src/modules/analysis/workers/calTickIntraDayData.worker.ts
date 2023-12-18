import { calTickIntraDayData } from '@modules/analysis/util/ticks/calTickIntraDayData';

addEventListener('message', (event) => {
  postMessage(calTickIntraDayData(event.data));
});

// addEventListener('messageerror', () => {
//   postMessage('messageerror');
// });
