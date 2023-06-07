import type { App } from '@slack/bolt';
import * as console from 'console';

export function eventOnAppMention(boltApp: App) {
  boltApp.event('app_mention', async (args) => {
    console.log('app_mention', args.event);
  });
}
