This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Prisma 安装使用

```bash

npm i prisma -D

npx prisma init --datasource-provider sqlite

//add sql text then

npx prisma migrate dev --name init

//可视化查看数据

npx prisma studio
```

### 开发 qa 列表

- `src` 和 `app dir` 能否混用
  - 配置互斥
- 国际化方案
  - nextjs 自带的
    https://github.com/vercel/next.js/blob/canary/examples/app-dir-i18n-routing/i18n-config.ts demo 地址
    缺点: 功能不全 少了 <Trans> 等格式化
  - next-translate
    老方案, 支持`nextjs 最新版` 支持`app dir`可以节省服务端资源, 可以直接迁移之前的组件
    缺点: 第三方
