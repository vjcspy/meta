import type { AWS } from '@serverless/typescript';
import { serverlessSimpleConfiguration } from 'sls-config';

const config: AWS = serverlessSimpleConfiguration({
  service: 'mk-proxy-sls',
  profile: 'ggg',
});

module.exports = config;
