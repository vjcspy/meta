/* eslint-disable no-param-reassign */
import { CliLogger } from 'chitility/dist/lib/logger/CliLogger';
import type { Request } from 'express';
import type { Options } from 'http-proxy-middleware';
import { createProxyMiddleware } from 'http-proxy-middleware';
import process from 'process';

const logger = new CliLogger('pim-proxy');
const originalOptions: Options = {
  // TODO: need to resolve target by setting or domain name
  target: process.env.PIM_BASE_PROXY_URL,
  changeOrigin: true, // needed for virtual hosted sites
  ws: false, // proxy websockets
  pathRewrite: {
    // '^/api/old-path': '/api/new-path', // rewrite path
    // '^/api/rest': '/rest', // remove base path
    '^/proxy/pim': '', // remove base path
    '^/proxy/pim/graphql': 'graphql', // remove base path
    '^/dev/proxy/pim/graphql': 'graphql', // remove base path
    '^/production/proxy/pim/graphql': 'graphql', // remove base path
    '^/staging/proxy/pim/graphql': 'graphql', // remove base path
  },
  secure: false,
  onProxyReq: (_proxyReq, req: Request) => {
    logger.info(
      `[Global Functional Middleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'...`
    );
  },
  router: {
    // TODO: config for development
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    // 'localhost:3000': 'https://pcms-stg.yutang.vn',
  },
  onProxyRes: (proxyRes) => {
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true'; // add new
    proxyRes.headers['Access-Control-Allow-Headers'] = '*'; // add new header
    proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // add new header

    // Fix: Error: chunked encoding not supported
    if (proxyRes.headers['transfer-encoding'] === 'chunked') {
      delete proxyRes.headers['transfer-encoding'];
    }

    /*
     * Disable cache on cloudfront when > 400
     * */
    if (proxyRes.statusCode && proxyRes.statusCode >= 400) {
      proxyRes.headers['cache-control'] = 'must-revalidate, proxy-revalidate';
    }
    // delete proxyRes.headers['x-removed']; // remove header from response
  },
};

export const pimProxy = createProxyMiddleware(
  ['/proxy/pim/**'],
  originalOptions
);
