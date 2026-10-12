/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // v1 is archived and served under https://verkun.com/v1
  basePath: "/v1",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/v1",
  },
};

export default nextConfig;
