/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    formats: ["image/webp", "image/avif"],
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
