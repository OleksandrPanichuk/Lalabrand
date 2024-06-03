const createNextIntlPlugin = require('next-intl/plugin');

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/:path*`,
      },
    ];
  },
  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
