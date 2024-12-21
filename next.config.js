/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.espncdn.com',
      },
      {
        protocol: 'https',
        hostname: 'site.api.espn.com',
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  onError: (err) => {
    console.error('Next.js build error:', err);
  },
}

module.exports = nextConfig 