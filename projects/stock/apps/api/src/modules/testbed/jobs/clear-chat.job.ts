import { SlackHelper } from '@modules/core/helper/slack.helper';
import { FlagRepo } from '@modules/core/repo/flag.repo';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess, XLogger } from '@nest/base/dist';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as shell from 'shelljs';

@Injectable()
export class ClearChatJob {
  private readonly logger = new XLogger(ClearChatJob.name);

  CHAT_KEYS = ['chat_1', 'chat_2'];

  constructor(
    private flagRepo: FlagRepo,
    private slackHelper: SlackHelper,
  ) {}

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)
  @Cron('*/20 * * * * *', {
    name: SyncValues.JOB_SYNC_OM_KEY,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async clearChat() {
    if (!isMainProcess()) return;
    for (let i = 0; i < this.CHAT_KEYS.length; i++) {
      let isOK = false;
      const CURL_KEY = `${this.CHAT_KEYS[i]}_curl`;
      const CURL_ENABLE_KEY = `${this.CHAT_KEYS[i]}_enable`;

      let curl = await this.flagRepo.findByKey(CURL_KEY);
      let enable = await this.flagRepo.findByKey(CURL_ENABLE_KEY);

      if (!enable) {
        await this.flagRepo.create(CURL_ENABLE_KEY, '0');
        enable = await this.flagRepo.findByKey(CURL_ENABLE_KEY);
      }

      if (!curl) {
        await this.flagRepo.create(CURL_KEY, '');
        curl = await this.flagRepo.findByKey(CURL_KEY);
      }

      if (
        enable.value === '1' &&
        typeof curl.value === 'string' &&
        curl.value.length > 10
      ) {
        const result = shell.exec(curl.value, { silent: true });

        if (result.code === 0) {
          isOK =
            typeof result.stdout === 'string' &&
            result.stdout.includes('"success":true');
        }

        if (!isOK) {
          this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
            text: `Fail clear GPT chat for key ${this.CHAT_KEYS[i]}`,
          });
        } else {
          this.logger.info(`Success clear GPT chat ${this.CHAT_KEYS[i]}`);
        }
      }
    }
  }
}
