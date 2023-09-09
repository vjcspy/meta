import { TestbedService } from '@modules/testbed/service/testbed.service';
import {
  TESTBED_EXCHANGE_KEY,
  TESTBED_ROUTING_KEY,
} from '@modules/testbed/values/tedbed.value';
import { XAppRequestContext, XLogger } from '@nest/base';
import { AmqpConnectionManager } from '@nest/rabbitmq/dist/model/amqp/connection-manager';
import { Controller, Get } from '@nestjs/common';
import * as _ from 'lodash';

@Controller('testbed')
export class TedbedController {
  private readonly logger: XLogger;

  constructor(
    private xAppRequestContext: XAppRequestContext,
    private testBedService: TestbedService,
    private readonly connectionManager: AmqpConnectionManager,
  ) {
    this.logger = new XLogger(TedbedController.name, this.xAppRequestContext);
  }

  @Get('foo')
  foo() {
    this.logger.info('hello 123', {
      test: 1,
      action: { a: 1 },
    });

    // this.logger.error('error 123', new Error('test error'), {
    //   test: 1,
    //   action: { a: 1 },
    // });
    //
    // this.logger.warn('error 123', {
    //   test: 1,
    //   action: { a: 1 },
    // });

    return { data: this.testBedService.getTestbedData() };
  }

  @Get('test-queue')
  testQueue() {
    this.connectionManager
      .getConnection()
      .publish(TESTBED_EXCHANGE_KEY, TESTBED_ROUTING_KEY, Math.random());
  }

  @Get('test-job-queue')
  testJobQueue() {
    const ran = _.random(1, 10);
    const body = {
      job_id: 'test_job_worker_1',
      payload: {
        ran,
      },
    };
    if (ran > 5) {
      body.job_id = 'test_job_worker_2';
    }

    this.connectionManager
      .getConnection()
      .publish(TESTBED_EXCHANGE_KEY, 'testbed.python.job.consumer.key', body);
  }
}
