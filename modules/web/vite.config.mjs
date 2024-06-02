// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dynamicImport from 'vite-plugin-dynamic-import';
// import tailwindcss from 'tailwindcss';
// import path from 'path';
// import builtins from 'rollup-plugin-node-builtins';
// import tsconfigPaths from 'vite-tsconfig-paths';

// const builtinsPlugin = {
//   ...builtins({ crypto: true }),
//   name: 'rollup-plugin-node-builtins',
// };

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), builtinsPlugin, dynamicImport(/* options */), tsconfigPaths()],

//   css: {
//     postcss: {
//       plugins: [tailwindcss],
//     },
//   },
//   resolve: {
//     extensions: ['.mjs', '.js', '.cjs', '.ts', '.jsx', '.tsx', '.json', '.vue'],
//     alias: {
//       '@': path.join(__dirname, 'src'),
//     },
//   },
//   optimizeDeps: {
//     exclude: ['crypto-api'],
//   },
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: './vitest.setup.mjs',
//   },
// });

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
    host: '127.0.0.1',
    proxy: {
      '/ws': {
        target: 'ws://127.0.0.1:2016', //这里是后台ws访问地址
        changeOrigin: true, //允许跨域设置
        ws: true, //websocket代理设置
        rewrite: (path) => path, //拦截路径去除
      },
      '/v3': {
        target: 'http://127.0.0.1:2016',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      // '/xtools': {
      //   target: 'http://localhost:5174/',
      //   changeOrigin: true,
      //   rewrite: (path) => path,
      // },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
