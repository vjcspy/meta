import { XLogger } from '@nest/base/dist';
import { Controller, Get } from '@nestjs/common';

@Controller('testbed')
export class TedbedController {
  private readonly logger = new XLogger(TedbedController.name);

  @Get('foo')
  foo() {
    this.logger.info('hello 123');
    this.logger.info('hello 123', {
      test: 1,
      action: { a: 1 },
    });

    this.logger.error('error 123', new Error('test error'), {
      test: 1,
      action: { a: 1 },
    });

    this.logger.warn('error 123', {
      test: 1,
      action: { a: 1 },
    });

    return 'foo';
  }
}
