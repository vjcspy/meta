import type { App } from '@slack/bolt';

export function actionButtonClick(boltApp: App) {
  boltApp.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
  });
}
