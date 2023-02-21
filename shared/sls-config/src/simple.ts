import type { AWS } from '@serverless/typescript';

export const serverlessSimpleConfiguration: (config: {
  service: string;
  profile: string;
  region?: any;
}) => AWS = (config) => {
  const { service, profile, region = 'us-east-1' } = config;
  return {
    service,
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-offline'],
    provider: {
      name: 'aws',
      runtime: 'nodejs18.x',
      region,
      stage: 'prod',
      profile,
      memorySize: 128,
      timeout: 10,
      logRetentionInDays: 30,
      logs: { httpApi: true },
      httpApi: {
        cors: true,
      },
      apiGateway: {
        minimumCompressionSize: 1024,
        shouldStartNameWithService: true,
      },
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        NODE_ENV: 'production',
      },
    },
    functions: {
      main: {
        handler: 'src/index.handler',
        timeout: 20,
        events: [
          {
            http: {
              method: 'any',
              path: '/{any+}',
              private: false,
              cors: {
                origin: '*',
                headers: [
                  'Content-Type',
                  'X-Amz-Date',
                  'Authorization',
                  'X-Api-Key',
                  'X-Amz-Security-Token',
                  'X-Amz-User-Agent',
                  'Store',
                ],
              },
            },
          },
        ],
      },
    },
    package: { individually: true },
    custom: {
      'serverless-offline': {
        httpPort: 4000,
        noPrependStageInUrl: true,
        reloadHandler: true,
      },
      esbuild: {
        bundle: true,
        minify: true,
        sourcemap: true,
        exclude: ['aws-sdk'],
        target: 'node14',
        define: { 'require.resolve': undefined },
        platform: 'node',
        concurrency: 10,
        packager: 'pnpm',
        keepNames: true,
        disableIncremental: true,
      },
    },
  };
};
