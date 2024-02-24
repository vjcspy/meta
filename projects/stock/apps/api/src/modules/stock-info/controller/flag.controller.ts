import { SlackHelper } from '@modules/core/helper/slack.helper';
import { OkResponse } from '@modules/core/model/ok-response';
import { FlagRepo } from '@modules/core/repo/flag.repo';
import { FlagDto } from '@modules/stock-info/controller/flag.dto';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('flag')
export class FlagController {
  constructor(
    private flagRepo: FlagRepo,
    private slackHelper: SlackHelper,
  ) {}

  @Post('save')
  async save(@Body() rq: FlagDto) {
    await this.flagRepo.update(rq.key, rq.value);

    this.slackHelper.postMessage(SyncValues.SLACK_ALERT_CHANNEL_NAME, {
      text: `Flag update for key ${rq.key}`,
    });
    return new OkResponse();
  }

  @Get('load')
  async load(@Query('key') key: string) {
    const data = await this.flagRepo.findByKey(key);

    return new OkResponse('OK', data);
  }
}
