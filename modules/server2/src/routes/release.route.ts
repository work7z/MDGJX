import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { DotFn } from '@/i18n/TranslationUtils';
import { ReleaseLatestResponse, ReleaseStatusResponse, SysResponse, TypeRecentReleaseNotes } from './_types';
import { InfoFn } from '@/system/info';
import { URL_RELEASE_GET_ALL, URL_RELEASE_GET_INFO, URL_RELEASE_GET_LATEST, URL_RELEASE_GET_STATUS } from '@/web2share-copy/server_urls';
import path from 'path';
import fs from 'fs';
import { logger } from '@/utils/logger';
import i18nItems from '@/i18n/i18n-copy';

let usHost = 'http://betalaftools.codegen.cc:8080';
let cnHost = usHost;
// TODO: for now, we just use usHost for all users

let isDev = process.env.NODE_ENV === 'development';

let META_DIR = isDev ? path.join(process.env.LAFTOOLS_ROOT, 'modules', 'meta') : '/opt/app/meta';

let getResourceNameByVersion = (crtVersion: string, platform: string) => {
  let ext = platform == 'windows-x64' || platform == 'windows-arm64' ? 'zip' : 'tar.gz';
  return `LafTools-${crtVersion}-${platform}-minimal.${ext}`;
};

let getJSONFromFile = (filePath: string): any | null => {
  if (!fs.existsSync(filePath)) {
    logger.error('file not found: ' + filePath);
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8').toString());
};

export class ReleaseRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(URL_RELEASE_GET_STATUS, async (req, res) => {
      let statusJSON = path.join(META_DIR, 'status.json');
      let status = getJSONFromFile(statusJSON);
      if (!status) {
        return res.send({
          content: null,
        } satisfies SysResponse<ReleaseStatusResponse>);
      } else {
        return res.send({
          content: status as ReleaseStatusResponse,
        } satisfies SysResponse<ReleaseStatusResponse>);
      }
    });
    this.router.get(URL_RELEASE_GET_LATEST, async (req, res) => {
      let Dot = DotFn(req);
      let info = InfoFn(req);
      logger.debug('META_DIR:' + META_DIR);
      let releaseJSON = path.join(META_DIR, 'release.json');
      let latestVer = null;
      let release: any = null;
      try {
        release = JSON.parse(fs.readFileSync(releaseJSON, 'utf8').toString());
        latestVer = release.latestVersion as string;
      } catch (e) {
        logger.error('release.json not found or unavailable');
        return res.send({
          content: {
            latestVersion: latestVer,
            anyUpdate: false,
            updateInfo: null,
          },
        } satisfies SysResponse<ReleaseLatestResponse>);
      }
      let fn_returnEmpty = () => {
        let emptyResponse: SysResponse<ReleaseLatestResponse> = {
          content: {
            latestVersion: latestVer,
            anyUpdate: false,
            updateInfo: null,
          },
        };
        res.send(emptyResponse);
      };

      if (!fs.existsSync(releaseJSON)) {
        logger.error('release.json not found');
        return fn_returnEmpty();
      }
      let crtVersion = info.version;
      // if the version is higher, then skip
      if (crtVersion >= latestVer) {
        fn_returnEmpty();
        return;
      }

      let crtHost = info.fromCNRegion ? cnHost : usHost;
      let fileNameInURL = getResourceNameByVersion(latestVer, info.platform);

      res.send({
        content: {
          latestVersion: latestVer,
          anyUpdate: true,
          updateInfo: {
            autoUpdated: release.autoUpdated as boolean,
            latest: {
              version: latestVer,
              pkgURL: `${crtHost}/${latestVer}/${fileNameInURL}`,
              sha256SumURL: `${crtHost}/${latestVer}/SHA256SUM.txt`,
              fileName: fileNameInURL,
            },
          },
        },
      } satisfies SysResponse<ReleaseLatestResponse>);
    });
    this.router.get(URL_RELEASE_GET_ALL, async (req, res) => {
      let Dot = DotFn(req);
      let info = InfoFn(req);
      res.send({
        content: 'this is URL_RELEASE_GET_ALL',
      } satisfies SysResponse<any>);
    });
    this.router.get(URL_RELEASE_GET_INFO, async (req, res) => {
      let Dot = DotFn(req);
      let info = InfoFn(req);
      // let infoLangVerListFile = path.join(META_DIR, 'versions', `${info.lang}.json`);
      // if (!fs.existsSync(infoLangVerListFile)) {
      //   logger.error('infoLangVerListFile not found');
      //   fn_returnEmpty();
      //   return;
      // }
      // let infoLangArr: {
      //   version: string;
      //   date: string;
      // }[] = require(infoLangVerListFile);

      // let recentReleaseNotesArr: TypeRecentReleaseNotes[] = [];
      // for (let i = 0; i < infoLangArr.length; i++) {
      //   let eachLoopVer = infoLangArr[i].version;
      //   if (eachLoopVer <= crtVersion) {
      //     break;
      //   } else {
      //     let releaseNotesFile = path.join(META_DIR, 'versions', info.lang, `${eachLoopVer}.md`);
      //     if (!fs.existsSync(releaseNotesFile)) {
      //       logger.error('release notes not found');
      //       fn_returnEmpty();
      //       return;
      //     }
      //     let eachLoopReleaseNotes = fs.readFileSync(releaseNotesFile, 'utf8');
      //     recentReleaseNotesArr.push({
      //       version: eachLoopVer,
      //       content: eachLoopReleaseNotes,
      //     });
      //   }
      // }
      res.send({
        content: 'this is URL_RELEASE_GET_INFO',
      } satisfies SysResponse<any>);
    });
  }
}
