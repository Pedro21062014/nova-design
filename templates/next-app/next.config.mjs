/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The dev server is also reached through a proxy host in hosted sandboxes.
  allowedDevOrigins: ["*.e2b.app", "localhost", "127.0.0.1"],
};

export default nextConfig;
