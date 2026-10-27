/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The screenshots are flat UI captures, so AVIF pays off hard on them.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
