import { isDevEnv, isTestEnv } from "./env";

let isDev = process.env.NODE_ENV === "development";
// for test env, it's still using the local server
export const API_SERVER_URL = isTestEnv()
  ? "https://api.laftools.cn"
  : isDevEnv()
  ? "http://127.0.0.1:2016"
  : "https://api.laftools.cn";

export type APITypeInfo = {
  lang: string;
  platform: string;
  version: string;
  region: string;
};
export let getLAFRegion = (currentLang: string) => {
  const LAFREGION = import.meta.env.LAFREGION; // TODO: handle LAFREGION process.env.LAFREGION
  let region = currentLang == "zh_CN" ? "CN" : "US";
  if (LAFREGION) {
    // if the region is set in the env, use it
    region = LAFREGION;
  }
  return region;
};
