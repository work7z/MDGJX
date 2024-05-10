import { HEADER_X_LAF_LANG, HEADER_X_LAF_PLATFORM, HEADER_X_LAF_REGION, HEADER_X_LAF_VERSION } from '@/web2share-copy/server_constants';
import i18nItems, { I18nItem } from '@/i18n/i18n-copy';
import { Request } from 'express';

export type RequestInfo = {
  version: string;
  lang: string;
  region: string;
  fromCNRegion: boolean;
  platform: string;
  langItem: I18nItem;
};

export let InfoFn = (req: Request): RequestInfo => {
  let region = req.headers[HEADER_X_LAF_REGION] as string;
  let fromCNRegion = region === 'CN';
  let lang = req.headers[HEADER_X_LAF_LANG] as string;
  // get i18n item
  let findItem = i18nItems.find(item => {
    if (item.Value === lang) {
      return true;
    }
  });
  if (!findItem) {
    findItem = i18nItems[0];
    lang = findItem.Value;
  }
  return {
    langItem: findItem,
    region,
    fromCNRegion,
    version: req.headers[HEADER_X_LAF_VERSION] as string,
    lang: lang,
    platform: req.headers[HEADER_X_LAF_PLATFORM] as string,
  };
};
