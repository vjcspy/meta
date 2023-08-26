import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { xAppContext } from './XAppContext';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: any, res: any, next: any) {
    res.on('finish', () => {
      xAppContext().isUserContext = false;
    });

    next();
  }
}
