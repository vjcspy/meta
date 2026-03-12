import {defineConfig} from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    // @ts-ignore
    datasource: {
        url: process.env.DATABASE_URL!
    },
    experimental: {
        externalTables: true,
    },
    tables: {
        external: [
            "public.flyway_schema_history",
            "public.qrtz_blob_triggers",
            "public.qrtz_calendars",
            "public.qrtz_cron_triggers",
            "public.qrtz_fired_triggers",
            "public.qrtz_job_details",
            "public.qrtz_locks",
            "public.qrtz_paused_trigger_grps",
            "public.qrtz_scheduler_state",
            "public.qrtz_simple_triggers",
            "public.qrtz_simprop_triggers",
            "public.qrtz_triggers",
            "public.tasks",
        ],
    },
});
