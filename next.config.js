/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["lucide-react"], // transpiler added for lucide react
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

module.exports = nextConfig;
