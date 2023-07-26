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
- 国际化方案 适配 app 目录
  next-intl 可行

  - 解决不在客户端加载所有多语言
  - 在`client`端动态修改国际化语言的方案
  - `router.push` 需要传入语言位(封装), `location` 跳转不需要
  - 解决`nextjs`默认语言位时会去被掉的问题
    next-translate 报错 不支持
    react-intl rsc 不支持

- 使用并行路由拆分不同设备的组件
  - `@mobile` 和 `@pc`
  - `layout` 放在外面, 不可以使用 `html` 和 `body` 等标签
  - 如果加载了 `@pc` 的组件 `@mobile` 的服务端代码会执行, 但是其中的的 `client` 端组件不会加载, 达到了资源拆分的效果

src 和 app 目录共存

- 文件互斥 src 模式需要将 /components /lib 都放在 src 里面
- 配置不能共用 next-translate 和 next-intl 配置

enki 配置迁移
没有\_app 文件, 使用 ReactDOM.reload api 可以实现 `preload`, 但是没有方案去实现 `<link src={xxx.{lang}.css}>`

迁移中间件
cookies api 更新 进行总

layout 独立 header 上标签策略和旧版不一样, 会直接影响分享 fb 等功能
[参考链接](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields)

### 暂时挂起的 pdp 功能

1. seo 如何优雅处理

```js
const ProductDetailSEO: React.FC<Props> = ({ product, post, path }) => {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
              "@context": "http://schema.org",
              "@type": "Product",
              "name": "${product?.name?.replace(/"/g, '') || ''}",
              "image": ${JSON.stringify(product?.img_urls)},
              "description": "${
                product?.description?.trim()
                  ? product.description.trim().replace(/"|\n|\r|\t/g, '')
                  : product?.name?.replace(/"/g, '') || ''
              }",
              "sku": "${product?.id}",
              "mpn": "${product?.id}",
              "brand": {
                  "@type": "Brand",
                  "name": "Weee"
              },
              ${
                post?.total

```

2. 不同用户访问 pdp 的拆分, 如 `robot` `new user` `old user` `vip user` 等

### 项目中的问题

页面状态保持方案

- swr todo
- 埋点从客户端触发
- 无法 `import 'swiper/swiper.min.css'`
- getCroppedImageUrl 未适配需要删减逻辑
