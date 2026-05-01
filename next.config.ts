import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  // Ignore TypeScript errors during production builds (deployment)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Add security headers including a CSP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
