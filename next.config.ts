import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import "@/styles/global.scss";`,
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com"
    ]
  },
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
