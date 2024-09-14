import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      all: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: [],
      statements: 80,
    },
  },
});
