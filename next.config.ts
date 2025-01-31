import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 機密情報はenvに記載しないで下さい。
  env: {
    ENV: process.env.ENV,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  // ビルド用設定
  output: "standalone",
};

export default nextConfig;
