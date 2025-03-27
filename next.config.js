/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['cloud.appwrite.io'],
  },
};

module.exports = nextConfig; 