import { createServer } from '@main/packages-web-server';
import next from 'next';
import * as path from 'path';

const port = parseInt(process.env.PORT ?? '3001', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const publicPath = path.join(__dirname, '..', 'public') ?? '';
createServer(app, {
  port,
  publicPath,
  useNextRoutingForPath: ['__nextjs', 'test', '__rr', '_next'],
  dev,
})
  .then(() => {
    // EMPTY
  })
  .catch((error) => {
    console.error(error);
  });
