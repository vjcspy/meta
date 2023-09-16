import { FlagRepo } from '@modules/core/repo/flag.repo';
import { XAppRequestContext, XLogger } from '@nest/base/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestbedService {
  private readonly logger: XLogger;

  constructor(
    private xAppRequestContext: XAppRequestContext,
    private flagRepo: FlagRepo,
  ) {
    this.logger = new XLogger(TestbedService.name, this.xAppRequestContext);
  }

  getTestbedData() {
    this.logger.log('Get Testbed Data');

    return 'Test bed data';
  }
}
