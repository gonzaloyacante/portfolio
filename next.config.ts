import type { NextConfig } from "next";

// Ensure Turbopack uses the project folder as the workspace root when there
// are multiple lockfiles in parent folders. This silences the runtime
// warning and avoids Next resolving the app from the wrong directory.
const nextConfig: NextConfig & { turbopack?: { root?: string } } = {
  /* config options here */
  reactCompiler: true,

  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
