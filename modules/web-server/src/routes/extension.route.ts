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
import axios from 'axios';
import { isBetaTestServerMode } from '@/env';

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

const getExtStaticURL = (subPath: string): string => {
  const srv = getExtStaticServer();
  const fullURL = srv + `/ext-root/${isBetaTestServerMode || isDevEnv() ? 'test' : 'release'}${subPath}`;
  return fullURL;
};

export const getExtStaticDataRemotely = async (subPath: string): Promise<any> => {
  const fullURL = getExtStaticURL(subPath);
  try {
    const r = await axios(fullURL);
    if (r.status !== 200) {
      throw new Error(`failed to get ${fullURL}`);
    }
    if (!_.isString(r.data)) {
      return r.data;
    } else {
      return _.trim(r.data);
    }
  } catch (e) {
    throw new Error(`failed to get ${fullURL}, error: ${fullURL}`);
  }
};

export const getAllExtMetaInfo = async (req: ExtMetaSearchReq, filterWhileSearchingInExtDir?: (extDir: string) => boolean): Promise<ExtMetaInfo> => {
  let results: MiaodaConfig[] = [];
  let tmp_results: MiaodaConfig[] = [];
  if (req.searchSource == 'cloud-all-ext') {
    const refTxt = await getExtStaticDataRemotely('/pkg-info/ref.txt');
    const miaodaDistAll = await getExtStaticDataRemotely(`/pkg-info/miaoda-dist-all-${refTxt.trim()}.json`);
    tmp_results = miaodaDistAll as MiaodaConfig[];
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
        tmp_results.push(miaoda);
      }
    }
  }
  for (let miaoda of tmp_results) {
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
  tmp_results = [];

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
export const preventEnvPortalModeRunCheck = () => {
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

type ProgressStatus = 'success' | 'running' | 'done' | 'error';
type MiaodaProgressStatus = {
  runTS: string;
  status: ProgressStatus;
  message: string;
};
let MiaodaInstallAppProgressObj: {
  [id: string]: MiaodaProgressStatus;
} = {
  //
};

export class ExtensionRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/ext/check-ext-mode',
      asyncHandler(async (req, res) => {
        sendRes(res, {
          data: getExtMode(),
        });
      }),
    );
    this.router.get(
      '/ext/get-ext-list',
      asyncHandler(async (req, res) => {
        const allMetaInfo = await getAllExtMetaInfo(req.query as ExtMetaSearchReq, x => true);

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
      '/ext/harmful/clean-ext',
      asyncHandler(async (req, res) => {
        preventEnvPortalModeRunCheck();
        MiaodaInstallAppProgressObj = {};
        sendRes(res, { data: 1 });
      }),
    );

    // install extensions
    this.router.get(
      '/ext/harmful/install-ext',
      asyncHandler(async (req, res) => {
        preventEnvPortalModeRunCheck();
        const reqQuery = req.query as {
          fullId: string;
        };
        if (!reqQuery.fullId) {
          throw new Error('missing extId');
        }
        (async () => {
          if (MiaodaInstallAppProgressObj[reqQuery.fullId] ?? MiaodaInstallAppProgressObj[reqQuery.fullId].status == 'running') {
            logger.info('already running for ' + reqQuery.fullId + ', therefore skip');
            return;
          }
          const refObj: MiaodaProgressStatus = {
            runTS: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            status: 'running',
            message: '开始准备下载链接...',
          };
          let alreadyExitNow = (): boolean => {
            if (MiaodaInstallAppProgressObj[reqQuery.fullId] == refObj) {
              // still the same
              return false;
            } else {
              return true;
            }
          };
          MiaodaInstallAppProgressObj[reqQuery.fullId] = refObj;
          try {
            if (alreadyExitNow()) {
              return;
            }
            const outputTarGzFile = path.join(val_getLocalInstalledExtDir, reqQuery.fullId + '.tar.gz');
            // axios fs write
            refObj.message = '正在下载中.....  目标链接: ' + outputTarGzFile;
            if (alreadyExitNow()) {
              return;
            }
            await axios({
              method: 'get',
              url: getExtStaticURL(`/pkg-repo/${reqQuery.fullId}.tar.gz`),
              responseType: 'stream',
            }).then(function (response) {
              refObj.status = 'success'
              refObj.message = `下载已完成，正在写入本地文件...`;
              if (alreadyExitNow()) {
                return;
              }
              response.data.pipe(fs.createWriteStream(outputTarGzFile));
            });
          } catch (e) {
            refObj.status = 'error';
            refObj.message = '产生错误: ' + JSON.stringify(e);
          }
        })();
        sendRes(res, {
          data: 1,
        });
      }),
    );

    this.router.get(
      '/ext/harmful/get-ext-progress-all-data',
      asyncHandler(async (req, res) => {
        preventEnvPortalModeRunCheck();
        sendRes(res, {
          data: MiaodaInstallAppProgressObj,
        });
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
        const allMetaInfo = await getAllExtMetaInfo(
          {
            searchSource: 'local-dev-ext',
            searchText: undefined,
          } as ExtMetaSearchReq,
          x => {
            return x == id;
          },
        );
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
        const allMetaInfo = await getAllExtMetaInfo(
          {
            searchSource: 'local-dev-ext',
            searchText: undefined,
          } as ExtMetaSearchReq,
          x => {
            return x == id;
          },
        );
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
