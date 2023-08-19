import { XAppContext, XLogger } from '@nest/base/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestbedService {
  private readonly logger: XLogger;

  constructor(private xAppContext: XAppContext) {
    this.logger = new XLogger(TestbedService.name, this.xAppContext);
  }

  getTestbedData() {
    this.logger.log('Get Testbed Data');

    return 'Test bed data';
  }
}
