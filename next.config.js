const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts',
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pbs.twimg.com'],
  },
  output: 'standalone',
  experimental: {
    esmExternals: true,
    serverActions: true,
    legacyBrowsers: false,
  },
  // modularizeImports: {
  //   lodash: {
  //     transform: 'lodash/{{member}}',
  //   },
  // },
}

module.exports = withNextIntl(nextConfig)
