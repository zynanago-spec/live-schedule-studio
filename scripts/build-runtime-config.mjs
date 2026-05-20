import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const fallbackConfig = {
  enableSupabase: true,
  supabaseUrl: "https://mfskmcrfykobtdmfvbju.supabase.co",
  supabaseAnonKey: "sb_publishable_7uriHFzUMIqbVMrmqTzemg_ywolFC7n",
  recordsTable: "live_schedule_records",
  teachersTable: "live_schedule_teachers",
  autoMigrateLocalData: true
};

const config = {
  enableSupabase: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) || fallbackConfig.enableSupabase,
  supabaseUrl: process.env.SUPABASE_URL || fallbackConfig.supabaseUrl,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || fallbackConfig.supabaseAnonKey,
  recordsTable: process.env.SUPABASE_RECORDS_TABLE || fallbackConfig.recordsTable,
  teachersTable: process.env.SUPABASE_TEACHERS_TABLE || fallbackConfig.teachersTable,
  autoMigrateLocalData: true
};

const rootRuntimeConfig = resolve("runtime-config.js");
const publicDir = resolve("public");
const publicRuntimeConfig = resolve(publicDir, "runtime-config.js");
const publicIndex = resolve(publicDir, "index.html");
const publicApp = resolve(publicDir, "schedule.html");

await mkdir(publicDir, { recursive: true });
await writeFile(rootRuntimeConfig, "window.APP_CONFIG = " + JSON.stringify(config, null, 2) + ";\n", "utf8");
await writeFile(publicRuntimeConfig, "window.APP_CONFIG = " + JSON.stringify(config, null, 2) + ";\n", "utf8");
await copyFile(resolve("index.html"), publicIndex);
await copyFile(resolve("直播排期表.html"), publicApp);
