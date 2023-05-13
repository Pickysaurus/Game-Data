/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ 'staticdelivery.nexusmods.com' ],
    remotePatterns: [
      { 
        protocol: 'https',
        hostname: 'staticdelivery.nexusmods.com'
      }
    ]
  }
}

module.exports = nextConfig
