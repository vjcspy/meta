import { Injectable, Scope } from '@nestjs/common';

import { AbstractContext } from './AbstractContext';

@Injectable({ scope: Scope.REQUEST })
export class XAppContext extends AbstractContext {}
