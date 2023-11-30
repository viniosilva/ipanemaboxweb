import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8", // or 'instabul'
      reporter: ["text", "json", "html"],
      exclude: [
        ...configDefaults.exclude,
        "*.cjs",
        "src/vite-env.d.ts",
        "src/main.tsx",
        "src/integrations/**",
      ],
    },
  },
});
