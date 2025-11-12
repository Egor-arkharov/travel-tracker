// next.config.ts
import path from "path";
import { fileURLToPath } from "url";

import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://apis.google.com https://accounts.google.com https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://*.googleapis.com https://oauth2.googleapis.com https://accounts.google.com https://*.gstatic.com https://*.firebaseio.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebasestorage.googleapis.com https://*.vercel-insights.com",
  "img-src 'self' data: blob: https://*.gstatic.com https://*.googleapis.com https://lh3.googleusercontent.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "frame-src https://www.google.com https://accounts.google.com https://*.firebaseapp.com",
  "frame-ancestors 'self'",
].join("; ");


const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=(), accelerometer=(), autoplay=()" },
];

const config: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },

  sassOptions: { includePaths: [path.join(__dirname, "src", "styles")] },

  images: {
    domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
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

  compiler: { removeConsole: { exclude: ["error", "warn"] } },
};

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(config);
