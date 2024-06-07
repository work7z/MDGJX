import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite/jsx-in-js.js
import esbuild from "esbuild";
import fs from "fs";

// Vite doesn't support JSX in .js files by default so we need to use esbuild to transform them

// const rollupPlugin = matchers => ({
//   name: "js-in-jsx",
//   async load(id) {
//     if (matchers.some(matcher => matcher.test(id))) {
//       const file = await fs.readFileSync(id, { encoding: "utf-8" });
//       return esbuild.transformSync(file, { loader: "jsx" });
//     }
//   }
// });
// https://vitejs.dev/config/
export default defineConfig({
  //  build: {
  //        rollupOptions: {
  //          plugins: matchers => [rollupPlugin(matchers)]
  //        },
  //        commonjsOptions: {
  //          transformMixedEsModules: true
  //        }
  //      },
  //      optimizeDeps: {
  //        esbuildOptions: {
  //          loader: {
  //            ".js": "jsx"
  //          }
  //        }
  //      },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy", "classProperties"],
        },
      },
    }),
  ],
  server: {
    port: 29999,
  },
});
