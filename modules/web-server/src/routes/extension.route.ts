import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { DotFn } from '@/i18n/TranslationUtils';
import { sendRes } from '@/commonSimpleRoutes';
import { isDevEnv } from '@/web2share-copy/env';
import _ from 'lodash';
import shelljs from 'shelljs';
import { getRootDataDir, devonly_getExtDir, getLocalPkgExtract, getLocalPkgRepo } from '@/web2share-copy/homedir';
import path from 'path';
import fs from 'fs';
import { logger } from '@/utils/logger';
import dayjs from 'dayjs';
import { MiaodaBasicConfig } from '../m-types-copy/base/m-types-main';
import { asyncHandler, getExtStaticServer } from '@/app';
import { ChildProcess } from 'child_process';
import axios from 'axios';
import { isBetaTestServerMode } from '@/env';
import { CacheUtils } from '@/utils/CacheUtils';
import { computeHash } from '@/utils/hash';
import compressUtils from '@/utils/compressUtils';
import { fn_runOrRestartExtViewAppServer } from '@/ext-view-app';

const pinyin = require('tiny-pinyin');
const val_devOnly_pkgExtract_dir = devonly_getExtDir();
const val_pkgExtract_dir = getLocalPkgExtract();
const val_pkgRepo_dir = getLocalPkgRepo();

export type ExtModeSt = {
  isDev: boolean;
  repoPath: string;
};
export type MiaodaExtraDevConfig = {
  // post-process
  fuzzySearchStr?: string;
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

export const filename_miaoda_dist_file = 'miaoda-dist.json';
export const filename_ack_file = 'miaoda-installed-ack.flag';

export const getExtMode = (): ExtModeSt => {
  return {
    isDev: isDevEnv(),
    repoPath: val_devOnly_pkgExtract_dir,
  };
};
const extFileFlag = isBetaTestServerMode || isDevEnv() ? 'test' : 'release';
const pkgInfoFlag = 'pkg-info-' + extFileFlag;

const getExtStaticURL = (subPath: string): string => {
  const srv = getExtStaticServer();
  const fullURL = srv + `/ext-root/${subPath}`;
  return fullURL;
};

CacheUtils.enableInterval();
const TIMEOUT_FOR_EXT_STATIC_RES = isBetaTestServerMode ? 100 : isDevEnv() ? 1000 : 1000 * 60; // 20 or 60 seconds

export const getExtStaticDataRemotely = async (subPath: string): Promise<any> => {
  const fullURL = getExtStaticURL(subPath);
  try {
    const prev = CacheUtils.get(fullURL);
    if (prev) {
      return prev;
    }
    logger.info('getting ' + fullURL);
    const r = await axios.get(fullURL);
    if (r.status !== 200) {
      logger.error('failed to get ' + fullURL);
      throw new Error(`failed to get ${fullURL}`);
    }
    let finalData = _.isString(r.data) ? _.trim(r.data) : r.data;
    CacheUtils.put(fullURL, finalData, TIMEOUT_FOR_EXT_STATIC_RES);
    return finalData;
  } catch (e) {
    logger.error('failed to get ' + fullURL + ', error: ' + e);
    throw new Error(`failed to get ${fullURL}, error: ${fullURL}`);
  }
};
const lastUpdatedObj = {
  ver: null
}

export const getAllExtMetaInfo = async (req: ExtMetaSearchReq, filterWhileSearchingInExtDir?: (extDir: string) => boolean): Promise<ExtMetaInfo> => {
  let results: MiaodaConfig[] = [];
  let tmp_results: MiaodaConfig[] = [];
  let lastUpdatedVal: string | null = null;
  if (req.searchSource == 'cloud-all-ext') {
    const refTxt = await getExtStaticDataRemotely('/' + pkgInfoFlag + '/ref.txt');
    lastUpdatedVal = refTxt;
    const miaodaDistAll = await getExtStaticDataRemotely(`/${pkgInfoFlag}/miaoda-dist-all-${refTxt.trim()}.json`);
    tmp_results = miaodaDistAll as MiaodaConfig[];
    // get all extensions from cloud
  } else if (req.searchSource == 'local-dev-ext') {
    // get all extensions from local development mode
    const projectRoots = shelljs.ls(val_devOnly_pkgExtract_dir);
    for (let eachFile of projectRoots) {
      if (filterWhileSearchingInExtDir && !filterWhileSearchingInExtDir(eachFile)) {
        continue;
      }
      logger.info('loading ext: ' + eachFile);
      const ackFile = path.join(val_devOnly_pkgExtract_dir, eachFile, isDevEnv ? filename_miaoda_dist_file : filename_ack_file);
      if (!fs.existsSync(ackFile)) {
        logger.info('skipping ' + eachFile + ' due to missing ack file');
        continue;
      }
      const miaodaJSON = path.join(val_devOnly_pkgExtract_dir, eachFile, filename_miaoda_dist_file);
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
  let finalLastUpdatedValue = lastUpdatedVal || 'ext-v2020.01.15';
  if(finalLastUpdatedValue!==lastUpdatedObj.ver && lastUpdatedObj.ver){
    if(IsCurrentPortalServerMode()){
      logger.info('ext meta info updated, therefore restart ext-view-app');
      fn_runOrRestartExtViewAppServer();
    }
  }
  return {
    allMetaInfo: results,
    totals: results.length,
    lastUpdated: finalLastUpdatedValue,
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

export type IdVerMatch = {
  id: string;
  version: string;
  ackTS: string;
  config?: MiaodaConfig;
};
export type InstalledLatestExts = {
  exts: {
    [key: string]: IdVerMatch[];
  };
};

export let run_when_install_uninstall_ext = async () => {
  fn_runOrRestartExtViewAppServer();
};

export const getCompleteExtInstalledListWithOldAndNew = (req?: GetInstalledExtReq): InstalledLatestExts => {
  let latestExts: InstalledLatestExts = {
    exts: {},
  };
  const isLocalDevConfigMode = req && req.env == 'local-config';
  const targetExtraDir = isLocalDevConfigMode ? val_devOnly_pkgExtract_dir : val_pkgExtract_dir;
  const allList = shelljs.ls(targetExtraDir);
  const installedExts = allList.filter(x => {
    return fs.existsSync(path.join(targetExtraDir, x, isLocalDevConfigMode ? filename_miaoda_dist_file : filename_ack_file));
  });
  for (let eachExt of installedExts) {
    const ackFile = path.join(targetExtraDir, eachExt, filename_ack_file);
    const miaodaJSON = path.join(targetExtraDir, eachExt, filename_miaoda_dist_file);
    if (isLocalDevConfigMode) {
      // for DEV
      const miaoda = JSON.parse(fs.readFileSync(miaodaJSON).toString()) as MiaodaConfig;
      if (!miaoda.disabled) {
        if (!latestExts.exts[miaoda.id]) {
          latestExts.exts[miaoda.id] = [];
        }
        latestExts.exts[miaoda.id].push({
          id: miaoda.id,
          version: miaoda.version,
          ackTS: Date.now() + '',
          config: miaoda,
        });
        continue;
      }
    } else {
      // for PROD
      if (eachExt.indexOf('@') === -1) {
        continue;
      }
      if (fs.existsSync(ackFile) && fs.existsSync(miaodaJSON)) {
        const ackTS = fs.readFileSync(ackFile).toString();
        const miaoda = JSON.parse(fs.readFileSync(miaodaJSON).toString()) as MiaodaConfig;
        if (!miaoda.disabled) {
          if (!latestExts.exts[miaoda.id]) {
            latestExts.exts[miaoda.id] = [];
          }
          latestExts.exts[miaoda.id].push({
            id: miaoda.id,
            version: miaoda.version,
            ackTS,
            config: miaoda,
          });
        }
      }
    }
  }
  return latestExts;
};

export type GetInstalledExtReq = {
  env: 'cloud-config' | 'local-config';
};

export let getInstalledExtsFlatModeWithDetail = (req?: GetInstalledExtReq) => {
  const installedExts: IdVerMatch[] = [];
  const all = getCompleteExtInstalledListWithOldAndNew(req);
  _.forEach(all.exts, (x, d, n) => {
    const maxItem = _.maxBy(x, xx => xx.ackTS);
    installedExts.push(maxItem);
  });
  return installedExts;
};

export let getInstalledExtsFlatMode = () => {
  const fullDetail = getInstalledExtsFlatModeWithDetail();
  const installedExts: string[] = _.map(fullDetail, x => `${x.id}@${x.version}`);
  return installedExts;
};

export const preventEnvPortalModeRunCheck = () => {
  if (IsCurrentPortalServerMode()) {
    throw new Error('抱歉，此操作仅允许本地部署模式执行，云端服务器无法处理此请求。 ');
  }
};
export type ClosableFn = () => void;
type DevProcessStatus = 'running' | 'stopped' | 'error' | 'ready';
export type DevRunStatus = {
  setupStatus: DevProcessStatus;
  serviceStatus: DevProcessStatus;
  killSetupProcess?: ClosableFn;
  killServiceProcess?: ClosableFn;
};

const MiaodaEntireRunStatus: {
  // id and run status
  [key: string]: DevRunStatus | null;
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

type InstallProgressStatus = 'success' | 'running' | 'done' | 'error';
type InstallProgressStatusObj = {
  runTS: string;
  status: InstallProgressStatus;
  message: string;
};
let MiaodaInstallAppProgressObj: {
  [id: string]: InstallProgressStatusObj;
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
      '/ext/get-full-info',
      asyncHandler(async (req, res) => {
        const query = req.query as GetInstalledExtReq;
        const fullDetail = getInstalledExtsFlatModeWithDetail(query);
        const miaodaConfigs = _.sortBy(fullDetail.filter(x => x.config).map(x => x.config),[
          'sortOrder'
        ]);
        sendRes(res, {
          data: {
            miaodaConfigs: miaodaConfigs,
          } satisfies {
            miaodaConfigs: MiaodaConfig[];
          },
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
    const fn_getInit = (): DevRunStatus => {
      return {
        setupStatus: 'ready',
        serviceStatus: 'ready',
      };
    };

    this.router.get(
      '/ext/get-all-installed-exts',
      asyncHandler(async (req, res) => {
        const installedExts = getInstalledExtsFlatMode();
        sendRes(res, {
          data: installedExts,
        });
      }),
    );

    this.router.get(
      '/ext/harmful/clean-ext',
      asyncHandler(async (req, res) => {
        preventEnvPortalModeRunCheck();
        // delete all keys in MiaodaInstallAppProgressObj
        for (let eachKey in MiaodaInstallAppProgressObj) {
          delete MiaodaInstallAppProgressObj[eachKey];
        }
        sendRes(res, { data: 1 });
      }),
    );

    this.router.get(
      '/ext/harmful/uninstall-ext',
      asyncHandler(async (req, res) => {
        preventEnvPortalModeRunCheck();
        const reqQuery = req.query as {
          fullId: string;
        };
        const fullId = reqQuery.fullId;
        if (!fullId) {
          throw new Error('missing extId');
        }
        const allDirs = shelljs.ls(val_pkgExtract_dir);
        for (let eachDir of allDirs) {
          const same = fullId.split('@')[0] == eachDir.split('@')[0];
          if (same) {
            const outputDecompressExtract = path.join(val_pkgExtract_dir, eachDir);
            if (fs.existsSync(outputDecompressExtract)) {
              shelljs.rm('-rf', outputDecompressExtract);
            }
          }
        }
        run_when_install_uninstall_ext();
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
        const fullId = reqQuery.fullId;
        if (!fullId) {
          throw new Error('missing extId');
        }
        (async () => {
          try {
            if (MiaodaInstallAppProgressObj[fullId] && MiaodaInstallAppProgressObj[fullId].status == 'running') {
              logger.info('already running for ' + fullId + ', therefore skip');
              return;
            }
            const refObj: InstallProgressStatusObj = {
              runTS: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              status: 'running',
              message: '开始准备下载链接...',
            };
            MiaodaInstallAppProgressObj[fullId] = refObj;
            let alreadyExitNow = (): boolean => {
              if (MiaodaInstallAppProgressObj[fullId] == refObj) {
                // still the same
                return false;
              } else {
                return true;
              }
            };
            let logfn = () => {
              logger.info('current progress: ' + JSON.stringify(refObj));
            };
            try {
              if (alreadyExitNow()) {
                return;
              }
              const outputDownloadTarGzFile = path.join(val_pkgRepo_dir, fullId + '.tar.gz');
              // axios fs write
              refObj.message = '正在下载中.....  目标文件: ' + outputDownloadTarGzFile;
              logfn();
              if (alreadyExitNow()) {
                return;
              }
              const raw_sha256val = await getExtStaticDataRemotely('/' + pkgInfoFlag + '/' + fullId + '.sha256');
              const sha256val = _.chain(raw_sha256val).trim().split(' ').first().trim().value();
              logger.info('sha256val: ' + sha256val);
              refObj.message = '读取到SHA256摘要值: ' + sha256val;
              logfn();
              await axios({
                method: 'get',
                url: getExtStaticURL(`/pkg-repo/${fullId}.tar.gz`),
                responseType: 'stream',
              }).then(function (response) {
                refObj.status = 'running';
                refObj.message = `下载已完成，正在写入本地文件...`;
                logfn();
                if (alreadyExitNow()) {
                  return;
                }
                const outputDecompressExtract = path.join(val_pkgExtract_dir, fullId);
                if (fs.existsSync(outputDownloadTarGzFile)) {
                  shelljs.rm('-rf', outputDownloadTarGzFile);
                }
                response.data.pipe(fs.createWriteStream(outputDownloadTarGzFile));
                response.data.on('end', async () => {
                  try {
                    refObj.status = 'running';
                    refObj.message = `写入本地文件完成，正在校验SHA256中...`;
                    logfn();
                    if (alreadyExitNow()) {
                      return;
                    }

                    const actual_shasum = await computeHash(outputDownloadTarGzFile);
                    if (!actual_shasum) {
                      throw new Error('文件下载不完整，请重新下载');
                    }
                    if (_.trim(_.toLower(actual_shasum)) !== _.trim(_.toLower(sha256val))) {
                      throw new Error('文件校验不通过，请重新下载');
                    }
                    // 开始解压
                    const finalDecompressFolder = outputDecompressExtract;
                    if (fs.existsSync(finalDecompressFolder)) {
                      shelljs.rm('-rf', finalDecompressFolder);
                    }
                    const tmpID = Date.now() + parseInt(Math.random() * 1000 + '') + '';
                    const tmpDecompressFolder = path.join(val_pkgExtract_dir, tmpID);
                    await compressUtils.decompress(outputDownloadTarGzFile, tmpDecompressFolder);
                    await shelljs.mv(path.join(tmpDecompressFolder, fullId), finalDecompressFolder);
                    await shelljs.rm('-rf', tmpDecompressFolder);
                    // 解压成功，
                    const finalDirmiaodDistFile = path.join(finalDecompressFolder, filename_miaoda_dist_file);
                    if (!fs.existsSync(finalDirmiaodDistFile)) {
                      throw new Error('failed to find miaoda-dist.json');
                    } else {
                      const finalDirmiaoAckFile = path.join(finalDecompressFolder, filename_ack_file);
                      fs.writeFileSync(finalDirmiaoAckFile, Date.now() + '');
                      // 成功
                      refObj.status = 'done';
                      refObj.message = '安装成功';
                      run_when_install_uninstall_ext();
                      setTimeout(() => {
                        delete MiaodaInstallAppProgressObj[fullId];
                      }, 3000);
                    }
                  } catch (e) {
                    refObj.status = 'error';
                    refObj.message = '产生二级错误: ' + e + JSON.stringify(e);
                    logfn();
                  }
                });
              });
            } catch (e) {
              refObj.status = 'error';
              refObj.message = '产生错误: ' + e + JSON.stringify(e);
              logfn();
            }
          } catch (e) {
            logger.error('error when installing: ' + e);
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
        const run_logs = path.join(__dirname, findItem.id + '-run.log');
        let text_run_logs = 'no logs found';
        if (fs.existsSync(run_logs)) {
          text_run_logs = fs.readFileSync(run_logs).toString();
        }
        // default
        MiaodaEntireRunStatus[findItem.id] = MiaodaEntireRunStatus[findItem.id] || fn_getInit();
        switch (type) {
          case 'get-all':
            sendRes(res, {
              data: {
                logs: text_run_logs,
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
        sendRes(res, {
          data: 1,
        });
        if (true) {
          return;
        }
        // const allMetaInfo = await getAllExtMetaInfo(
        //   {
        //     searchSource: 'local-dev-ext',
        //     searchText: undefined,
        //   } as ExtMetaSearchReq,
        //   x => {
        //     return x == id;
        //   },
        // );
        // const findItem = allMetaInfo.allMetaInfo.find(x => x.id == id);
        // if (!findItem) {
        //   throw new Error('not found');
        // }
        // MiaodaEntireRunStatus[findItem.id] = MiaodaEntireRunStatus[findItem.id] || fn_getInit();
        // const tItem = MiaodaEntireRunStatus[findItem.id];
        // const cwd = findItem.cwd || path.join(val_devonly_LafToolsExtDir, findItem.id);
        // const setup_logs = path.join(__dirname, findItem.id + '-setup.log');
        // const run_logs = path.join(__dirname, findItem.id + '-run.log');
        // if (!fs.existsSync(setup_logs)) {
        //   fs.writeFileSync(setup_logs, '');
        // }
        // if (!fs.existsSync(run_logs)) {
        //   fs.writeFileSync(run_logs, '');
        // }
        // logger.info('cwd: ' + cwd);
        // logger.info('setup_logs: ' + setup_logs);
        // logger.info('run_logs: ' + run_logs);
        // switch (type) {
        //   case 'setup':
        //     if (tItem.killSetupProcess) {
        //       tItem.killSetupProcess();
        //     }
        //     const setup_devcmd = 'npm run md-dev-setup';
        //     const e = shelljs.exec(setup_devcmd, {
        //       cwd: cwd,
        //       async: true,
        //       silent: true,
        //     });
        //     // pipe to setup_logs
        //     e.stdout.pipe(fs.createWriteStream(setup_logs));
        //     e.stderr.pipe(fs.createWriteStream(setup_logs));
        //     tItem.killSetupProcess = () => {
        //       kill_process(e);
        //     };

        //     sendRes(res, {
        //       data: 1,
        //     });
        //     break;
        //   case 'start-service':
        //     if (tItem.killServiceProcess) {
        //       tItem.killServiceProcess();
        //     }
        //     const run_devcmd = 'npm run md-dev-run';
        //     const e2 = shelljs.exec(run_devcmd, {
        //       cwd: cwd,
        //       async: true,
        //       silent: true,
        //     });
        //     e2.stdout.pipe(fs.createWriteStream(run_logs));
        //     e2.stderr.pipe(fs.createWriteStream(run_logs));
        //     e2.on('message', msg => {
        //       fs.appendFileSync(run_logs, msg.toString() + '\n');
        //     });
        //     tItem.killServiceProcess = () => {
        //       kill_process(e2);
        //     };

        //     sendRes(res, {
        //       data: 1,
        //     });
        //     break;
        //   case 'stop-service':
        //     if (tItem.killServiceProcess) {
        //       tItem.killServiceProcess();
        //     }
        //     sendRes(res, {
        //       data: 1,
        //     });
        //     break;
        //   default:
        //     throw new Error('not supported');
        // }
      }),
    );
  }
}
