import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
  // Keep PDF/DOCX parsers on the server filesystem (no broken pdf.worker bundling)
  serverExternalPackages: ["pdf-parse", "mammoth"],
};

export default nextConfig;
