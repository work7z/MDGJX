import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dynamicImport from "vite-plugin-dynamic-import";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import path from "path";
import builtins from "rollup-plugin-node-builtins";

const builtinsPlugin = {
  ...builtins({ crypto: true }),
  name: "rollup-plugin-node-builtins",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), builtinsPlugin, dynamicImport(/* options */)],

  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    extensions: [".mjs", ".js", ".cjs", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ["crypto-api"],
  },
});
