const withNextIntl = require('next-intl/plugin')('./src/lib/i18n.ts');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = withNextIntl(config);
