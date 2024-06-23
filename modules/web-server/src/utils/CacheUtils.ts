type CacheObj = {
  data: any;
  time: number;
  timeout: number;
  timeoutFn: NodeJS.Timeout;
};
const tmp_cache: {
  [key: string]: CacheObj;
} = {};
let enabled=false;
export const CacheUtils = {
  // put data into cache
  put: (key: string, data: any, timeout: number) => {
    if (tmp_cache[key]) {
      clearTimeout(tmp_cache[key].timeoutFn);
    }
    tmp_cache[key] = {
      data,
      time: Date.now(),
      timeout,
      timeoutFn: setTimeout(() => {
        delete tmp_cache[key];
      }, timeout),
    };
  },
  // get data from cache
  get: (key: string) => {
    if (tmp_cache[key]) {
      return tmp_cache[key].data;
    }
    return null;
  },
  enableInterval: () => {
    if(!enabled){
      enabled=true;
    }else{
      return;
    }
    // interval clean it
    setInterval(() => {
      const now = Date.now();
      for (let key in tmp_cache) {
        if (now - tmp_cache[key].time > tmp_cache[key].timeout) {
          delete tmp_cache[key];
        }
      }
    }, 1000);
  },
};
