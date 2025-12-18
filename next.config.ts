import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.51939393.com", "c.animaapp.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
