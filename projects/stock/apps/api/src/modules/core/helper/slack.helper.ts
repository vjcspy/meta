import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import * as process from 'process';

@Injectable()
export class SlackHelper {
  private readonly logger = new Logger(SlackHelper.name);
  constructor(private readonly httpService: HttpService) {}

  postMessage(channelName: string, messageOptions: any) {
    if (this.getSlackUrl() && this.getSlackToken()) {
      this.httpService.post(`${this.getSlackUrl()}/post-message`, {
        token: this.getSlackToken(),
        payload: {
          channel_name: channelName,
          messageOptions,
        },
      });
    }

    this.logger.warn('Please config slack');
  }

  private getSlackUrl() {
    return process.env.SLACK_URL;
  }

  private getSlackToken() {
    return process.env.SLACK_TOKEN;
  }
}
