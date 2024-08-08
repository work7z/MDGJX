/// <reference types="vite/client" />
// 声明一个模块来扩展 Window 接口
declare global {
  interface Window {
    PRE_RENDER_MODE?: boolean;
    val_systemMRes?: any;
    val_testNum?: number;
  }
}

export {};
