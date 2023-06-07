import type { AWS } from '@serverless/typescript';
import { serverlessSimpleConfiguration } from 'sls-config';

const config: AWS = serverlessSimpleConfiguration({
  service: 'meta-slack-sls',
  profile: 'ggg',
  plugins: ['serverless-ssm-fetch'],
  customs: {
    serverlessSsmFetch: {
      SLACK_BOT_TOKEN: '/meta/slack/production/SLACK_BOT_TOKEN',
      SLACK_SIGNING_SECRET: '/meta/slack/production/SLACK_SIGNING_SECRET',
    },
  },
});

module.exports = config;
