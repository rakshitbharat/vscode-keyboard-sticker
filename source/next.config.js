/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
};

module.exports = nextConfig;
