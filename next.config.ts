import { startCronJob } from "@/app/lib/corn/corn";
import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    startCronJob();  // Start the cron job when the app initializes
    return [];
  },
};

export default nextConfig;
