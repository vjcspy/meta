import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import * as process from 'process';
import { map } from 'rxjs/operators';

@Injectable()
export class SlackHelper {
  static DEFAULT_CHANNEL_NAME = 'general-meta-bot-channel';
  private isLogResponse = false;
  private readonly logger = new Logger(SlackHelper.name);
  constructor(private readonly httpService: HttpService) {}

  postMessage(channelName: string, messageOptions: any) {
    if (this.getSlackUrl() && this.getSlackToken()) {
      this.httpService
        .post(`${this.getSlackUrl()}/post-message`, {
          token: this.getSlackToken(),
          payload: {
            channel_name: channelName,
            messageOptions,
          },
        })
        .pipe(
          map((res) => {
            if (this.isLogResponse) {
              console.log(res);
            }
          })
        )
        .subscribe();
    } else {
      this.logger.warn('Please config slack');
    }
  }

  private getSlackUrl() {
    return process.env.SLACK_URL;
  }

  private getSlackToken() {
    return process.env.SLACK_TOKEN;
  }
}
