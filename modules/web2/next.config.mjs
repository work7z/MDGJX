// Date: Thu, 8 Feb 2024
// Author:
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

let isDev = process.env.NODE_ENV === "development";
export const API_SERVER_URL = isDev
  ? "http://127.0.0.1:2016"
  : "https://api.laftools.cn";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize", "sequelize-typescript"],
  },
  output: "standalone",
  rewrites: async () => {
    return [
      {
        source: "/pxy/v3/:path*",
        destination: `${API_SERVER_URL}/v3/:path*`,
      },
      // {
      //   source: "/v3/:path*",
      //   destination: `${API_URL}/v3/:path*`,
      // },
    ];
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
