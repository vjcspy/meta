import { OmMigrationHelper } from '@modules/migration/helper/om-migration.helper';
import { Controller, Get } from '@nestjs/common';

@Controller('migration')
export class MigrationController {
  constructor(private readonly omMigrationHelper: OmMigrationHelper) {}

  @Get('test')
  test() {
    this.omMigrationHelper.doMigrate();
  }

  @Get('test1')
  test1() {
    this.omMigrationHelper.migrate('TNG', '2023-01-10');
  }
}
