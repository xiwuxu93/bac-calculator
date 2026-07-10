const withNextIntl = require('next-intl/plugin')('./src/lib/i18n.ts');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en/',
        permanent: true,
      },
      {
        source: '/:path((?!en(?:/|$)|api(?:/|$)|_next(?:/|$)|[^/]+\\.[^/]+$).+)',
        destination: '/en/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(config);
