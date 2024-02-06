import { configDefaults, defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom", // or 'happy-dom'
      coverage: {
        provider: "v8", // or 'instabul'
        reporter: ["text", "json", "html"],
        exclude: [
          ...configDefaults.exclude,
          "*.cjs",
          "src/vite-env.d.ts",
          "src/main.tsx",
          "src/integrations/**",
        ]
      },
    },
  })
);
