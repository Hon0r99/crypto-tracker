/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s2.coinmarketcap.com'],
  },
  env: {
    API_KEY: process.env.API_KEY,
  }
}

module.exports = nextConfig
