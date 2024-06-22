import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { DotFn } from '@/i18n/TranslationUtils';
import { sendRes } from '@/commonSimpleRoutes';
import { isDevEnv } from '@/web2share-copy/env';
import _ from 'lodash';
import shelljs from 'shelljs';
import { getLafToolsDataDir, devonly_getLafToolsExtDir, getLocalInstalledExtDir } from '@/web2share-copy/homedir';
import path from 'path';
import fs from 'fs';
import { logger } from '@/utils/logger';
import dayjs from 'dayjs';
import { MiaodaBasicConfig } from '../m-types-copy/base/m-types-main';
import { asyncHandler, getExtStaticServer } from '@/app';
import { ChildProcess } from 'child_process';

const pinyin = require('tiny-pinyin');
const val_devonly_LafToolsExtDir = devonly_getLafToolsExtDir();
const val_getLocalInstalledExtDir = getLocalInstalledExtDir();

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
  searchSource: 'cloud-all-ext' | 'local-dev-ext';
};

const filename_miaoda_dist_file = 'miaoda-dist.json';


export const getExtMode = (): ExtModeSt => {
  return {
    isDev: isDevEnv(),
    repoPath: val_devonly_LafToolsExtDir,
  };
};

export const getDataRemotely = async (subPath:string):Promise<any>=>{
  const srv=  getExtStaticServer()
  axios
}

export const getAllExtMetaInfo = async (req: ExtMetaSearchReq, filterWhileSearchingInExtDir?: (extDir: string) => boolean): Promise<ExtMetaInfo> => {
  let results: MiaodaConfig[] = [];
  if (req.searchSource == 'cloud-all-ext') {
    
    // get all extensions from cloud
  } else if (req.searchSource == 'local-dev-ext') {
    // get all extensions from local development mode
    const projectRoots = shelljs.ls(val_devonly_LafToolsExtDir);
    for (let eachFile of projectRoots) {
      if (filterWhileSearchingInExtDir && !filterWhileSearchingInExtDir(eachFile)) {
        continue;
      }
      logger.info('loading ext: ' + eachFile);
      const miaodaJSON = path.join(val_devonly_LafToolsExtDir, eachFile, filename_miaoda_dist_file);
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
    const fullId = x.id + '@' + x.version;
    const specifialFolder = path.join(val_getLocalInstalledExtDir, fullId);
    const miaodaDist = path.join(specifialFolder, filename_miaoda_dist_file);
    x.installed = fs.existsSync(miaodaDist);
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
export let IsCurrentPortalServerMode = () => {
  return process.env.ONLINEMODE == 'true';
};
export const checkIfCurrentEnvPortalMode = () => {
  if (IsCurrentPortalServerMode()) {
    throw new Error('抱歉，此操作仅允许本地部署模式执行，云端服务器无法处理此请求。 ');
  }
};
export type ClosableFn = () => void;
type ProcessStatus = 'running' | 'stopped' | 'error' | 'ready';
export type MiaodaRunStatus = {
  setupStatus: ProcessStatus;
  serviceStatus: ProcessStatus;
  killSetupProcess?: ClosableFn;
  killServiceProcess?: ClosableFn;
};

const MiaodaEntireRunStatus: {
  // id and run status
  [key: string]: MiaodaRunStatus | null;
} = {};

export let kill_process = (child: ChildProcess) => {
  var spawn = require('child_process').spawn;
  // check if it's windows
  const isWin = process.platform === 'win32';
  if (!isWin) {
    child.kill();
    return;
  } else {
    spawn('taskkill', ['/pid', child.pid, '/f', '/t']);
  }
};

export class ExtensionRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/ext/check-ext-mode',
      asyncHandler((req, res) => {
        sendRes(res, {
          data: getExtMode(),
        });
      }),
    );
    this.router.get(
      '/ext/get-ext-list',
      asyncHandler((req, res) => {
        const allMetaInfo = getAllExtMetaInfo(req.query as ExtMetaSearchReq, x => true);

        sendRes(res, {
          data: allMetaInfo,
        });
      }),
    );
    // these are kind of harmful things, which should not be running in portal mode
    type HarmfulExtPostQuery = {
      id: string;
      type: 'get-all' | 'setup' | 'start-service' | 'stop-service';
    };
    const fn_getInit = (): MiaodaRunStatus => {
      return {
        setupStatus: 'ready',
        serviceStatus: 'ready',
      };
    };

    this.router.get(
      '/ext/harmful/install-ext',
      asyncHandler(async (req, res) => {
        checkIfCurrentEnvPortalMode();
        const reqQuery = req.query as {
          fullId: string;
        };
        if(!reqQuery.fullId){
          throw new Error('missing extId');
        }        
        // install the extensions locally
        // 1. firstly, check if miaoda-dist.json exist
      }),
    );

    this.router.get(
      '/ext/harmful/get-status',
      asyncHandler(async (req, res) => {
        checkIfCurrentEnvPermitHarmfulAPI();
        const query = req.query as HarmfulExtPostQuery;
        const id = query.id;
        const type = query.type; // init-log, service-log, config
        if (!id || !type) {
          throw new Error('missing id or type');
        }
        const allMetaInfo = await getAllExtMetaInfo({
          searchSource: 'local-dev-ext',
          searchText: undefined
        } as ExtMetaSearchReq, x => {
          return x == id;
        });
        const findItem = allMetaInfo.allMetaInfo.find(x => x.id == id);
        if (!findItem) {
          throw new Error('not found');
        }
        // default
        MiaodaEntireRunStatus[findItem.id] = MiaodaEntireRunStatus[findItem.id] || fn_getInit();
        switch (type) {
          case 'get-all':
            sendRes(res, {
              data: {
                config: findItem,
                status: _.pickBy(MiaodaEntireRunStatus[findItem.id], x => !_.isFunction(x)),
              },
            });
            break;
          default:
            throw new Error('not supported');
        }
      }),
    );
    this.router.get(
      '/ext/harmful/do-job',
      asyncHandler(async (req, res) => {
        checkIfCurrentEnvPermitHarmfulAPI();
        const query = req.query as HarmfulExtPostQuery;
        const id = query.id;
        const type = query.type; // init-log, service-log, config
        if (!id || !type) {
          throw new Error('missing id or type');
        }
        const allMetaInfo = await getAllExtMetaInfo({
          searchSource: 'local-dev-ext',
          searchText: undefined
        } as ExtMetaSearchReq, x => {
          return x == id;
        });
        const findItem = allMetaInfo.allMetaInfo.find(x => x.id == id);
        if (!findItem) {
          throw new Error('not found');
        }
        MiaodaEntireRunStatus[findItem.id] = MiaodaEntireRunStatus[findItem.id] || fn_getInit();
        const tItem = MiaodaEntireRunStatus[findItem.id];
        const cwd = findItem.cwd || path.join(val_devonly_LafToolsExtDir, findItem.id);
        const setup_logs = path.join(__dirname, findItem.id + '-setup.log');
        const run_logs = path.join(__dirname, findItem.id + '-run.log');
        if (!fs.existsSync(setup_logs)) {
          fs.writeFileSync(setup_logs, '');
        }
        if (!fs.existsSync(run_logs)) {
          fs.writeFileSync(run_logs, '');
        }
        logger.info('cwd: ' + cwd);
        logger.info('setup_logs: ' + setup_logs);
        logger.info('run_logs: ' + run_logs);
        switch (type) {
          case 'setup':
            if (tItem.killSetupProcess) {
              tItem.killSetupProcess();
            }
            const setup_devcmd = 'npm run md-dev-setup';
            const e = shelljs.exec(setup_devcmd, {
              cwd: cwd,
              async: true,
              silent: true,
            });
            // pipe to setup_logs
            e.stdout.pipe(fs.createWriteStream(setup_logs));
            e.stderr.pipe(fs.createWriteStream(setup_logs));
            tItem.killSetupProcess = () => {
              kill_process(e);
            };

            sendRes(res, {
              data: 1,
            });
            break;
          case 'start-service':
            if (tItem.killServiceProcess) {
              tItem.killServiceProcess();
            }
            const run_devcmd = 'npm run md-dev-run';
            const e2 = shelljs.exec(run_devcmd, {
              cwd: cwd,
              async: true,
              silent: true,
            });
            e2.stdout.pipe(fs.createWriteStream(run_logs));
            e2.stderr.pipe(fs.createWriteStream(run_logs));
            e2.on('message', msg => {
              fs.appendFileSync(run_logs, msg.toString() + '\n');
            });
            tItem.killServiceProcess = () => {
              kill_process(e2);
            };

            sendRes(res, {
              data: 1,
            });
            break;
          case 'stop-service':
            if (tItem.killServiceProcess) {
              tItem.killServiceProcess();
            }
            sendRes(res, {
              data: 1,
            });
            break;
          default:
            throw new Error('not supported');
        }
      }),
    );
  }
}
