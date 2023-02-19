# Meta

This is a typescript monorepo 

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager.

### Apps and Packages

***apps*** show case apps, only available in `main` branch

- `apps/web`: [Next.js](https://nextjs.org/) app



***shared*** include shared package **used throughout the monorepo**

- `shared/ui`: a stub React component library shared by `web` applications
- `shared/eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `shared/tsconfig`: `tsconfig.json` 



***projects***

- `projects/PROJECT_NAME/*`: folder used in the project branch



### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
pnpm dlx turbo link
```

## Conventions

### Package naming

- If a package created inside a `project` branch then it should be named starting with `@PROJECT_NAME/PACKAGE_TYPE-PACKAGE_NAME`
- Package in share folder, if use global(for both server and client) will not start with `@domain` ex `chitility`, `tsconfig`, else if it should start suck as `@web`

## Notes

- Think about writing once use forever. For example we're using `tsconfig` and `eslint` , etc.. for all module

- Looking for the way to use ES6 modules without having to bundle them (ie without build scripts in `package.json`). For example `transpilePackages` configuration in nextjs application. See [Internal packages](https://turbo.build/repo/docs/handbook/sharing-code/internal-packages)
