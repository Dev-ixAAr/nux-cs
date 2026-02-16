import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "dlcdnwebimgs.asus.com" },
      { protocol: "https", hostname: "asset.msi.com" },
      { protocol: "https", hostname: "static.gigabyte.com" },
      { protocol: "https", hostname: "images.evga.com" },
      { protocol: "https", hostname: "www.gskill.com" },
      { protocol: "https", hostname: "images.samsung.com" },
      { protocol: "https", hostname: "nzxt.com" },
      { protocol: "https", hostname: "lian-li.com" },
      { protocol: "https", hostname: "assets2.razerzone.com" },
      { protocol: "https", hostname: "p4-ofp.static.pub" },
      { protocol: "https", hostname: "resource.logitechg.com" },
      { protocol: "https", hostname: "resource.logitech.com" },
      { protocol: "https", hostname: "media.steelseriescdn.com" },
    ],
  },
};

export default nextConfig;
