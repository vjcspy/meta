import type { AWS } from '@serverless/typescript';

export const serverlessSimpleConfiguration: (config: {
  service: string;
  profile: string;
  region?: any;
  plugins?: string[];
  customs?: any;
}) => AWS = (config) => {
  const {
    service,
    profile,
    region = 'us-east-1',
    plugins = [],
    customs = {},
  } = config;
  return {
    useDotenv: true,
    service,
    frameworkVersion: '3',
    plugins: [
      'serverless-dotenv-plugin',
      'serverless-esbuild',
      'serverless-offline',
      ...plugins,
    ],
    provider: {
      name: 'aws',
      runtime: 'nodejs18.x',
      region,
      stage: 'production',
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
      },
      ...customs,
    },
  };
};
