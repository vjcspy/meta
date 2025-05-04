// import 'express-async-errors';

import { auth } from '@colyseus/auth';
import { monitor } from '@colyseus/monitor';
import { playground } from '@colyseus/playground';
import config from '@colyseus/tools';
import { authConfig } from '@modules/auth/auth-impl';
import { MapIndex } from '@modules/declaration/values/mapId';
import { mapMakerRouter } from '@modules/map-maker/controllers';
import { errorHandler } from '@modules/middlewares/errorHandler';
import { matchMaker, RedisPresence } from 'colyseus';

import { MapV1Room } from './rooms/maps/mapV1.room';

/**
 * Import your Room files
 */

authConfig();

export default config({
  options: {
    // devMode: true,
    presence: new RedisPresence('vm:6379'),
    publicAddress: 'localhost:2567',
  },
  initializeGameServer: (gameServer) => {
    // https://docs.colyseus.io/server/matchmaker#restricting-the-client-side-from-creating-rooms
    matchMaker.controller.exposedMethods = ['joinById', 'reconnect'];

    /**
     * Define your room handlers:
     */
    gameServer.define(MapIndex.MAP_V1, MapV1Room);
  },

  initializeExpress: (app) => {
    app.use(auth.prefix, auth.routes());
    /**
     * Bind your custom express routes here:
     * Read more: https://expressjs.com/en/starter/basic-routing.html
     */
    app.get('/hello_world', (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    app.use('/map-maker', auth.middleware(), mapMakerRouter);

    /**
     * Use @colyseus/playground
     * (It is not recommended to expose this route in a production environment)
     */
    if (process.env.NODE_ENV !== 'production') {
      app.use('/', playground());
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use('/monitor', monitor());
    app.use(errorHandler);
  },

  beforeListen: () => {
    /**
     * Before gameServer.listen() is called.
     */
  },
});
