const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@styles': path.resolve(__dirname, '/styles'),
    };
    return config;
  },
  images: {
    domains: ['via.placeholder.com'],
  },
};

module.exports = nextConfig;
