import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import glob from "fast-glob";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
});
