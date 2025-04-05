import path from 'path';

const nextConfig = {
  sassOptions: {
    additionalData: `@import "@/styles/global.scss";`,
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
