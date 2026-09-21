# 爪爪 PAWPAL 宠物洗护

Next.js App Router + React + TypeScript 单页网站。保留洗护服务、门店空间轮播、到店地图与预约信息生成，支持桌面和手机。

## 本地开发

使用 Node.js 24 LTS 和 npm：

```sh
npm ci
npm run dev
```

打开 http://localhost:3000。内容入口为 `src/app/page.tsx`，全局样式为 `src/app/globals.css`，页面组件位于 `src/components`。

## 构建与预览

```sh
npm run build
npm run preview
```

`output: 'export'` 将页面导出到 `dist`，预览地址为 http://localhost:3000。部署时上传整个 `dist`（包含 `_next` 和 `assets`）；现有 `.openai/hosting.json` 已指向该目录。不使用 `next start`，不需要 Node.js 生产服务器。

`dist` 是构建产物，不纳入版本控制。开发和构建共用输出目录，执行生产构建前请先停止开发服务。

## 检查

```sh
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

浏览器测试默认使用本机 Google Chrome，并自动在 3100 端口启动静态服务器。没有 Chrome 时可运行 `npx playwright install chrome`。测试覆盖资源加载、预约与校验、复制成功与失败、移动导航、轮播按钮/键盘/触摸和自动暂停。失败时的 trace 保存在 `test-results`。

## 内容与资源

- 首页静态内容由服务端组件在构建时生成，预约、导航、轮播与复制使用客户端组件。
- `public/assets` 存放实际使用的图片，重复内嵌图片已去重。`assets` 保留原始设计素材与生成提示。
- 修改服务内容时，同时核对服务卡片和预约表单选项；门店地址与地图链接在到店组件中维护。
- 预约仅生成可复制文本，由用户发送给门店确认，不调用后端、不保存个人信息。
- 使用浏览器本地日期限制预约日期；剪贴板不可用时选中文字并提示手动复制。
- 页面标题和描述在根布局中设置，网站图标为 `src/app/icon.svg`。

若受限环境无法写入 Next.js 用户遥测配置，可在运行命令前设置 `NEXT_TELEMETRY_DISABLED=1`（PowerShell：`$env:NEXT_TELEMETRY_DISABLED='1'`）。
