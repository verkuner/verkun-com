/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // The app page moved from /app to /health-radar; keep old links working.
    return [{ source: "/app", destination: "/health-radar", permanent: true }];
  },
};

export default nextConfig;
