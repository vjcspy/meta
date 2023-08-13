# DB

## Development

```bash
pnpm -F @stock/apps-api prisma:migrate
```

The `migrate dev` command:

1. Reruns the existing migration history in the [shadow database](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database) in order to detect schema drift (edited or deleted migration file, or a manual changes to the database schema)
2. Applies pending migrations to the shadow database (for example, new migrations created by colleagues)
3. Generates a new migration from any changes you made to the Prisma schema before running `migrate dev`
4. Applies all unapplied migrations to the development database and updates the `_prisma_migrations` table
5. Triggers the generation of artifacts (for example, Prisma Client)