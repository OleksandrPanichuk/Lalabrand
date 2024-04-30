const createNextIntlPlugin = require('next-intl/plugin');

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: `${API_URL}/graphql`,
      },
    ];
  },
  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
