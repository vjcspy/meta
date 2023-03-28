import chalk from 'chalk';
import { CliLogger } from 'chitility/dist/lib/logger/CliLogger';
import { CacheFile } from 'chitility/dist/util/cache-file';
import type { Express, Request, Response } from 'express';
import express from 'express';
import type { ParsedUrlQuery } from 'querystring';
import serveStatic from 'serve-static';
import { parse } from 'url';

import { errorHandler } from './middlewares/handle-error';

const logger = new CliLogger('Express Server');
let app: any;
export const createServer = async (
  nextApp: {
    prepare: () => Promise<any>;
    getRequestHandler: any;
  },
  config: {
    port: string | number;
    publicPath: string;
    useNextRoutingForPath?: string[];
    dev: boolean;
    rewritePrefix?: string;
  }
) => {
  app = nextApp;
  await nextApp.prepare();
  const server: Express = express();
  const nextRequestHandler: any = nextApp.getRequestHandler();

  server.get('/_next/*', (req, res) => {
    const parsedUrl = parse(req.url, true);

    /* serving _next static content using next.js handler */
    nextRequestHandler(req, res, parsedUrl);
  });

  server.use(serveStatic(config.publicPath));
  const {
    useNextRoutingForPath = ['__nextjs', 'test'],
    dev,
    rewritePrefix = '__rr',
  } = config;

  server.get('*', async (req, res, next) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    /*
     * NextJS Core URL
     * */
    if (pathname && useNextRoutingForPath.some((v) => pathname.includes(v))) {
      // logger.info(
      //   `Forward to ${chalk.blue('Next Core')} for pathname ${chalk.blue(
      //     pathname
      //   )}`
      // );
      return nextRequestHandler(req, res);
    }

    /*
     * NextJS only handler to render page or html rewrite page
     * */
    const re = /(?:\.([^.]+))?$/;
    const ext = pathname ? re.exec(pathname)?.[1] : undefined;
    if (!ext || ext === 'html') {
      logger.info(`Start NextJS RenderHTML: ${pathname}`);
      await renderHTML(req, res, pathname, query, { dev, rewritePrefix });
      logger.info(`End NextJS RenderHTML: ${pathname}`);
      return;
    } else {
      next(req);
    }
  });

  server.use(errorHandler);

  // Since this is the last non-error-handling
  // middleware use()d, we assume 404, as nothing else
  // responded.

  // $ curl http://localhost:3000/notfound
  // $ curl http://localhost:3000/notfound -H "Accept: application/json"
  // $ curl http://localhost:3000/notfound -H "Accept: text/plain"
  server.use((req, res) => {
    res.status(404);

    res.format({
      html: function () {
        res.render('404', { url: req.url });
      },
      json: function () {
        res.json({ error: 'Not found' });
      },
      default: function () {
        res.type('txt').send('Not found');
      },
    });
  });

  server.listen(config.port, () => {
    logger.info(
      `> Ready on http://localhost:${config.port} in ${
        dev ? chalk.blue('development') : chalk.blue('production')
      } mode`
    );
  });

  return server;
};

const resolvePathnameToRender = (originPath: string, rewritePrefix: string) => {
  if (!rewritePrefix || originPath.indexOf(rewritePrefix) > -1) {
    return originPath;
  } else {
    rewritePrefix =
      rewritePrefix.charAt(0) === '/' ? rewritePrefix : `/${rewritePrefix}`;
    originPath = originPath.charAt(0) === '/' ? originPath : `/${originPath}`;
    return `${rewritePrefix}${originPath}`;
  }
};

async function renderHTML(
  req: Request,
  res: Response,
  pathname: string | null,
  query: ParsedUrlQuery,
  config: {
    dev: boolean;
    rewritePrefix: string;
  }
) {
  const { dev = true, rewritePrefix } = config;
  try {
    // make sure path not start with /
    const pathnameToRender = resolvePathnameToRender(
      pathname ?? req.path,
      rewritePrefix
    );

    const CACHE_KEY = `FULL_PAGE_CACHE_${pathnameToRender}`;
    if (!dev) {
      const cachedPage = await CacheFile.get(CACHE_KEY);
      if (cachedPage?.html) {
        logger.info(`Cache HIT for path ${pathnameToRender}`);
        res.setHeader('x-cache', 'HIT');
        res.send(cachedPage.html);

        return;
      }
    }

    //console.log(`key ${key} not found, rendering`);
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pathnameToRender, query);

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }
    if (!dev) {
      await CacheFile.save(CACHE_KEY, { html });
    }
    res.setHeader('x-cache', 'MISS');
    res.send(html).end();
  } catch (err) {
    logger.error('NextJS renderHTML error');
    console.error(err);
    // res.status(500);
    // .json({ message: 'Error in invocation of NextJS renderHTML' });
    // res.send(app.renderErrorToHTML(err, req, res, req.path, req.query));
    app.renderError(err, req, res, req.path, req.query);
  }
}
