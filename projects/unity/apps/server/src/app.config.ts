import { auth } from '@colyseus/auth';
import { monitor } from '@colyseus/monitor';
import { playground } from '@colyseus/playground';
import config from '@colyseus/tools';
import { authConfig } from '@modules/auth/auth-impl';
import { matchMaker, RedisPresence } from 'colyseus';

import { SandboxRoom } from './rooms/maps/sandbox/sandbox.room';

/**
 * Import your Room files
 */

authConfig();

export default config({
  options: {
    devMode: true,
    presence: new RedisPresence('vm:6379'),
  },
  initializeGameServer: (gameServer) => {
    // https://docs.colyseus.io/server/matchmaker#restricting-the-client-side-from-creating-rooms
    matchMaker.controller.exposedMethods = ['join', 'joinById', 'reconnect'];

    /**
     * Define your room handlers:
     */
    gameServer.define('sandbox', SandboxRoom);
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
  },

  beforeListen: () => {
    /**
     * Before gameServer.listen() is called.
     */
  },
});
