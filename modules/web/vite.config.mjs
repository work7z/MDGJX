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
    open: true,
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
      '/ext-view':{
        target: 'http://127.0.0.1:3050',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      '/local': {
        target: 'http://127.0.0.1:3050',
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
