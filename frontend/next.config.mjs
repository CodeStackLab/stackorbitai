/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone mode: sirf required files bundle karta hai
  // Docker image size ~1.1GB se ~150-200MB tak aa jaati hai
  output: 'standalone',
};

export default nextConfig;
