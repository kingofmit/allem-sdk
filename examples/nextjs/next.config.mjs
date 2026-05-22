/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@allem-sdk/hooks",
    "@allem-sdk/ai",
    "@allem-sdk/forms",
    "@allem-sdk/analytics",
    "@allem-sdk/auth",
  ],
};

export default nextConfig;
