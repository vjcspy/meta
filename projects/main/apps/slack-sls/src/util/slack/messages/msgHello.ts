import type { App } from '@slack/bolt';

export function msgHello(boltApp: App) {
  boltApp.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    let user: any = 'X';
    if ('user' in message) {
      user = message.user;
    }

    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hey there <@${user}>!`,
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
            },
            action_id: 'button_click',
          },
        },
      ],
      text: `Hey there <@${user}>!`,
    });
  });
}
