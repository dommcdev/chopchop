import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactCompiler: true,
  cacheComponents: true,
  allowedDevOrigins: ["*.tetra-salmon.ts.net"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i3ae2rmmav.ufs.sh",
        port: "",
        pathname: "/f/**",
        search: "",
      },
    ],
  },

  async rewrites() {
    return [
      {
        // When the user goes here...
        source: "/dashboard/c/:path*",
        // ...actually show them the code from here:
        destination: "/dashboard/categories/:path*",
      },
      {
        source: "/dashboard/r/:path*",
        destination: "/dashboard/recipes/:path*",
      },
      {
        source: "/dashboard/s/:path*",
        destination: "/dashboard/short/:path*",
      },
    ];
  },
};

export default nextConfig;
