import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Naikkan batas sesuai kebutuhan (misal 10 MB)
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'l8nxqw6jstnrshk8.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
