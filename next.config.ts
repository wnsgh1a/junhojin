import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mbvtuscipoqggussfyxi.supabase.co",
        pathname: "/storage/v1/object/public/portfolio_image/**",
      },
    ],
  },
};

export default nextConfig;
