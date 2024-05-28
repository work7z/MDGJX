import { isDevEnv, isTestEnv } from './env';

// for test env, it's still using the local server
export const API_SERVER_URL =
  process.env.TEST_API_SERVER_URL || isTestEnv() ? 'https://api.laftools.cn' : isDevEnv() ? 'https://api.laftools.cn' : 'https://api.laftools.cn';

export type APITypeInfo = {
  lang: string;
  platform: string;
  version: string;
  region: string;
};
export let getLAFRegion = (currentLang: string) => {
  return 'CN';
  // const LAFREGION = process.env.LAFREGION;
  // let region = currentLang == 'zh_CN' ? 'CN' : 'US';
  // if (LAFREGION) {
  //   // if the region is set in the env, use it
  //   region = LAFREGION;
  // }
  // return region;
};
