import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    ENV: process.env.ENV,
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
