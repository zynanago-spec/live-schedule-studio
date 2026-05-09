import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const config = {
  enableSupabase: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
  recordsTable: process.env.SUPABASE_RECORDS_TABLE || "live_schedule_records",
  teachersTable: process.env.SUPABASE_TEACHERS_TABLE || "live_schedule_teachers",
  autoMigrateLocalData: true
};

const rootRuntimeConfig = resolve("runtime-config.js");
const publicDir = resolve("public");
const publicRuntimeConfig = resolve(publicDir, "runtime-config.js");
const publicIndex = resolve(publicDir, "index.html");
const publicApp = resolve(publicDir, "直播排期表.html");
const publicRuntimeConfigExample = resolve(publicDir, "runtime-config.example.js");

await mkdir(publicDir, { recursive: true });
await writeFile(rootRuntimeConfig, "window.APP_CONFIG = " + JSON.stringify(config, null, 2) + ";\n", "utf8");
await writeFile(publicRuntimeConfig, "window.APP_CONFIG = " + JSON.stringify(config, null, 2) + ";\n", "utf8");
await copyFile(resolve("index.html"), publicIndex);
await copyFile(resolve("直播排期表.html"), publicApp);
await copyFile(resolve("runtime-config.example.js"), publicRuntimeConfigExample);
