import { applyDecorators, SetMetadata } from '@nestjs/common';

import { EVENT_RX_HANDLER } from './event-rx.constants';
import type { EventRxHandlerConfig } from './event-rx.types';

export const EventRx = (config: EventRxHandlerConfig) =>
  applyDecorators(SetMetadata(EVENT_RX_HANDLER, { ...config }));

export const Effect = EventRx;
