/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tikaram-spirits-assets-prod.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/assets/events/*',
      },
      {
        protocol: 'https',
        hostname: 'tikaram-spirits-assets-prod.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/assets/cocktails/*',
      },
      {
        protocol: 'https',
        hostname: 'tikaram-spirits-assets-prod.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig

