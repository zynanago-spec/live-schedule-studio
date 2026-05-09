# 直播排期表上线说明

## 1. Supabase

1. 新建一个 Supabase 项目。
2. 在 SQL Editor 里运行 [supabase/schema.sql](/Users/nana/Documents/New%20project/supabase/schema.sql)。
3. 复制：
   - `Project URL`
   - `Anon Key`

## 2. 页面配置

本地调试时，编辑 [runtime-config.js](/Users/nana/Documents/New%20project/runtime-config.js)：

- `enableSupabase: true`
- 填入 `supabaseUrl`
- 填入 `supabaseAnonKey`

## 3. Vercel

1. 把这个目录推到 GitHub。
2. 在 Vercel 新建项目并导入仓库。
3. 配置环境变量：
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Build Command:
   - `npm run build`
5. Output Directory:
   - 留空即可

## 4. Cloudflare Pages

1. 同样导入 Git 仓库。
2. Build Command:
   - `npm run build`
3. Build output directory:
   - `/`
4. 环境变量：
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

## 5. 当前代码状态

- 未配置 Supabase 时：继续使用本地浏览器数据
- 配置 Supabase 后：自动进入云端同步模式
- 如果云端表为空，会把当前本地数据首轮迁移到云端
- 当前这版默认是“拿到链接即可访问和编辑”
- 如果后面要做账号分权限，再把 Supabase Policy 收紧并补登录页即可
