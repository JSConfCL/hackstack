import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [
    tailwind(),
    sanity({
      projectId: "dsb0by8m",
      dataset: "production",
      apiVersion: "2023-02-08",
      useCdn: true,
      studioBasePath: "/admin",
    }),
    react(),
  ],
});
