import { mkdir, writeFile } from "node:fs/promises";

const config = {
  enableSupabase: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
  recordsTable: process.env.SUPABASE_RECORDS_TABLE || "live_schedule_records",
  teachersTable: process.env.SUPABASE_TEACHERS_TABLE || "live_schedule_teachers",
  autoMigrateLocalData: true
};

await mkdir("dist", { recursive: true });
await writeFile(
  "runtime-config.js",
  "window.APP_CONFIG = " + JSON.stringify(config, null, 2) + ";\n",
  "utf8"
);
