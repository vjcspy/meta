import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { XAppContext } from './XAppContext';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  constructor(private contextService: XAppContext) {}

  use(req: any, res: any, next: any) {
    this.contextService.markAsUserContext().setXCorrelationId(uuidv4());
    next();
  }
}
