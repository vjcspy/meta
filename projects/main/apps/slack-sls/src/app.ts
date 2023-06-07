import { getInfoController } from '@controllers/getInfo';
import { slackPostMessageController } from '@controllers/slack/post-message';
import { errorHandler } from '@middlewares/handle-error';
import { initializeSlack } from '@util/slack';
import compression from 'compression';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';

const app: Express = express();

/* ____________________MIDDLEWARES____________________ */
app.use(compression()); // compresses requests
app.use('*', cors());
app.use(errorHandler);

/* ____________________CONTROLLERS____________________ */
app.get('/getinfo', getInfoController);
app.post('/slack/post-message', express.json(), slackPostMessageController);

// receive event from slack by http method
if (initializeSlack()) {
  app.use('/slack/events', initializeSlack()!.receiver.app);
}

export default app;
