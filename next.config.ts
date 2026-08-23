import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "i9.ytimg.com",
        pathname: "/vi/**",
      },
      // Project mockups and certificate pages uploaded through the admin
      // panel are served from Supabase Storage.
      //
      // Wildcarded rather than derived from NEXT_PUBLIC_SUPABASE_URL on
      // purpose: this file is evaluated once at server start, so an env-derived
      // host goes stale the moment the project changes and every uploaded
      // image then fails with "hostname is not configured" - which is not an
      // obvious thing to debug. The cost is that the image optimizer will
      // resize public objects from any Supabase project, which is a bandwidth
      // concern rather than a data one; the path prefix keeps it to public
      // storage objects.
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
