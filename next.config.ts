import path from "path";
import { fileURLToPath } from "url";

import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: NextConfig = {
  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },

  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
    ],
    formats: ["image/avif", "image/webp"] as const,
  },

  webpack(config: WebpackConfig) {
    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  compiler: {
    removeConsole: { exclude: ['error', 'warn'] },
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(config);
