import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb"
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "*.public.blob.vercel-storage.com"
      }
    ]
    unoptimized: true,
  }
};

export default nextConfig;
