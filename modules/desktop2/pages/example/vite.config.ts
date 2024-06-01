

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dynamicImport from 'vite-plugin-dynamic-import';

export default defineConfig({
  plugins: [react(), dynamicImport(/* options */), tsconfigPaths()],
  // css: {
  //   postcss: {
  //     plugins: [tailwindcss],
  //   },
  // },
  server: {
    port: 20167 // debut year
  },
});
