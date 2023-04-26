import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react()],
});
