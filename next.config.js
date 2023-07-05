const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts',
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-device-type',
            value: 'h5',
            condition: ({ req }) => /mobile/i.test(req.headers['user-agent'] || ''),
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-device-type',
            value: 'pc',
            condition: ({ req }) => !/mobile/i.test(req.headers['user-agent'] || ''),
          },
        ],
      },
    ]
  },
  images: {
    domains: ['pbs.twimg.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = withNextIntl(nextConfig)
