import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", // Permite qualquer caminho abaixo de /t/p/
      },
    ],
  },
};

export default nextConfig;
