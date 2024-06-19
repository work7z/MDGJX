import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { DotFn } from '@/i18n/TranslationUtils';
import { sendRes } from '@/commonSimpleRoutes';
import { isDevEnv } from '@/web2share-copy/env';
import _ from 'lodash';
import shelljs from 'shelljs';
import { getLafToolsDataDir, getLafToolsExtDir } from '@/web2share-copy/homedir';
import path from 'path';
import fs from 'fs';
import { logger } from '@/utils/logger';
import dayjs from 'dayjs';
import { MiaodaBasicConfig } from '../m-types-copy/base/m-types-main';

const pinyin = require('tiny-pinyin');
const currentProjectRoot = getLafToolsExtDir();

export type ExtModeSt = {
  isDev: boolean;
  repoPath: string;
};
export type MiaodaExtraDevConfig = {
  // post-process
  fuzzySearchStr?: string;
  installed?: boolean;
  hasNewVersion?: boolean;
};
export type MiaodaConfig = MiaodaExtraDevConfig & MiaodaBasicConfig;
export type ExtMetaInfo = {
  totals: number;
  lastUpdated: string;
  allMetaInfo: MiaodaConfig[];
};
export type ExtMetaSearchReq = {
  searchText: string;
};

export const getExtMode = (): ExtModeSt => {
  return {
    isDev: isDevEnv(),
    repoPath: currentProjectRoot,
  };
};

export const getAllExtMetaInfo = (
  req: ExtMetaSearchReq,
  filterWhileSearchingInExtDir?: (extDir: string) => boolean
): ExtMetaInfo => {
  const projectRoots = shelljs.ls(currentProjectRoot);
  let results: MiaodaConfig[] = [];
  for (let eachFile of projectRoots) {
    logger.info('loading ext: ' + eachFile);
    const miaodaJSON = path.join(currentProjectRoot, eachFile, 'miaoda-dist.json');
    if (fs.existsSync(miaodaJSON)) {
      const miaoda = JSON.parse(fs.readFileSync(miaodaJSON).toString()) as MiaodaConfig;
      if (miaoda.disabled) {
        continue;
      }
      const keywords = miaoda.keywords;
      const fuzzySearchStrArr = [];
      const addToFuzzy = (arr: string[]) => {
        for (let eachKeyword of arr) {
          if (!eachKeyword) {
            continue;
          }
          const pinyinStr = pinyin.convertToPinyin(eachKeyword);
          if (eachKeyword !== pinyinStr) {
            fuzzySearchStrArr.push(pinyinStr);
          }
          fuzzySearchStrArr.push(eachKeyword);
        }
      };
      addToFuzzy(keywords);
      addToFuzzy([miaoda.name, miaoda.shortDesc]);
      miaoda.fuzzySearchStr = _.toLower(fuzzySearchStrArr.join(' '));
      results.push(miaoda);
    }
  }
  // filter now
  req.searchText = _.trim(req.searchText);
  if (req.searchText) {
    const lowTxt = req.searchText.toLowerCase().trim();
    results = results.filter(each => {
      return each.fuzzySearchStr.indexOf(lowTxt) >= 0;
    });
  }
  // installed flag
  results = results.map(x => {
    if (isDevEnv()) {
      x.installed = true;
    }
    return x;
  });
  return {
    allMetaInfo: results,
    totals: results.length,
    lastUpdated: dayjs().format('YYYY-MM-DD'),
  };
};

export const checkIfCurrentEnvPermitHarmfulAPI = () => {
  // only development mode can touch setup, run and other operation
  if (!isDevEnv()) {
    // not dev
    throw new Error('not allowed');
  }
};

export class ExtensionRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/ext/check-ext-mode', (req, res) => {
      sendRes(res, {
        data: getExtMode(),
      });
    });
    this.router.get('/ext/get-ext-list', (req, res) => {
      const allMetaInfo = getAllExtMetaInfo(req.query as ExtMetaSearchReq);

      sendRes(res, {
        data: allMetaInfo,
      });
    });
    // these are kind of harmful things, which should not be running in portal mode
    type HarmfulExtPostQuery = {
      id: string;
      type: 'get-all' | 'setup' | 'start-service' | 'stop-service';
    };
    this.router.get('/ext/harmful/get-status', (req, res) => {
      checkIfCurrentEnvPermitHarmfulAPI();
      const query = req.query as HarmfulExtPostQuery;
      const id = query.id;
      const type = query.type; // init-log, service-log, config
      if(!id || !type) {
        throw new Error('missing id or type');
      }
      switch (type) {
        case 'get-all':
          sendRes(res, {
            data: 1,
          });
        default:
          throw new Error('not supported');
      }
    });
    this.router.get('/ext/harmful/do-job', (req, res) => {
      checkIfCurrentEnvPermitHarmfulAPI();
      const query = req.query as HarmfulExtPostQuery;
      const id = query.id;
      const type = query.type; // init-log, service-log, config
      if(!id || !type) {
        throw new Error('missing id or type');
      }
      switch (type) {
        case 'setup':
        case 'start-service':
        case 'stop-service':
          sendRes(res, {
            data: 1,
          });
        default:
          throw new Error('not supported');
      }
    });
  }
}
