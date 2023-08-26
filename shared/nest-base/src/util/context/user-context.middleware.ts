import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { xAppContext } from './XAppContext';
import { XAppRequestContext } from './XAppRequestContext';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  constructor(private contextService: XAppRequestContext) {}

  use(req: any, res: any, next: any) {
    const id = uuidv4();
    this.contextService.markAsUserContext().setXCorrelationId(id);
    xAppContext().markAsUserContext().setXCorrelationId(id);
    next();
  }
}
