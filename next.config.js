const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts',
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pbs.twimg.com'],
  },
  experimental: {
    esmExternals: true,
    serverActions: true,
  },
}

module.exports = withNextIntl(nextConfig)
