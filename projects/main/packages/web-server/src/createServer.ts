import { format } from '@web/base';
import type { Express, Request, Response } from 'express';
import express from 'express';
import type { ParsedUrlQuery } from 'querystring';
import serveStatic from 'serve-static';
import { parse } from 'url';

import { errorHandler } from './middlewares/handle-error';

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
    dev?: boolean;
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
  const { useNextRoutingForPath = ['__nextjs', 'test'] } = config;

  server.get('*', async (req, res, next) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    /*
     * NextJS Core URL
     * */
    if (pathname && useNextRoutingForPath.some((v) => pathname.includes(v))) {
      // console.log(
      //   '\n',
      //   '_______________________ NextJS Core URL Handler _______________________'
      // );
      // console.log('pathname', pathname);
      // console.log(
      //   '_________________________________________________________________',
      //   '\n'
      // );
      return nextRequestHandler(req, res);
    }

    /*
     * NextJS only handler to render page or html rewrite page
     * */
    const re = /(?:\.([^.]+))?$/;
    const ext = pathname ? re.exec(pathname)?.[1] : undefined;
    if (!ext || ext === 'html') {
      console.log(
        format.context('Express Server'),
        'Start NextJS RenderHTML: ',
        pathname
      );
      await renderHTML(req, res, pathname, query);
      console.log(
        format.context('Express Server'),
        'End NextJS RenderHTML: ',
        pathname
      );
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
    console.log(
      format.context('Express Server'),
      `> Ready on http://localhost:${config.port}`
    );
  });

  return server;
};

async function renderHTML(
  req: Request,
  res: Response,
  pathname: string | null,
  query?: ParsedUrlQuery
) {
  try {
    // make sure path not start with /
    const pathNameWithoutPrefix =
      typeof pathname === 'string' && pathname.charAt(0) === '/'
        ? pathname.substring(1)
        : pathname;

    //console.log(`key ${key} not found, rendering`);
    // If not let's render the page into HTML
    const html = await app.renderToHTML(
      req,
      res,
      `/__rr/${pathNameWithoutPrefix}`,
      query
    );

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    res.setHeader('x-cache', 'MISS');
    res.send(html).end();
  } catch (err) {
    console.error(format.context('Express Server'), 'NextJS renderHTML error');
    console.error(err);
    // res.status(500);
    // .json({ message: 'Error in invocation of NextJS renderHTML' });
    // res.send(app.renderErrorToHTML(err, req, res, req.path, req.query));
    app.renderError(err, req, res, req.path, req.query);
  }
}
