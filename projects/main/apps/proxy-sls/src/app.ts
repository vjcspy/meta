import { getInfoController } from '@controllers/getInfo';
import { baseProxy } from '@middlewares/base-proxy.middleware';
import { bedkingdomProxy } from '@middlewares/bedkingdom-proxy.middleware';
import { bedkingdomStgProxy } from '@middlewares/bedkingdom-stg-proxy.middleware';
import { errorHandler } from '@middlewares/handle-error';
import { pimProxy } from '@middlewares/pim-proxy.middleware';
import compression from 'compression';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';

const app: Express = express();

/* ____________________MIDDLEWARES____________________ */
app.use(compression()); // compresses requests
app.use('*', cors());
app.use('*', baseProxy);
app.use('*', bedkingdomProxy);
app.use('*', bedkingdomStgProxy);
app.use('*', pimProxy);
app.use(errorHandler);

/* ____________________CONTROLLERS____________________ */
app.get('/getinfo', getInfoController);

export default app;
