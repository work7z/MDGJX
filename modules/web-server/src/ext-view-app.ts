import { fn_getExtViewPath, fn_getExtViewPort } from './app';
import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { HttpException } from './exceptions/httpException';
import http from 'http';
import { getLocalPkgExtract } from './web2share-copy/homedir';
import _ from 'lodash';
import {
  MiaodaConfig,
  filename_miaoda_dist_file,
  getCompleteExtInstalledListWithOldAndNew,
  getInstalledExtsFlatMode,
} from './routes/extension.route';
import fs from 'fs';
import path from 'path';

const REF_HOLDER: {
  lastApp: ExtViewApp | null;
} = {
  lastApp: null,
};

const extViewPort = fn_getExtViewPort();

export class ExtViewApp {
  public app: express.Application;
  public port: string | number;
  public server: http.Server;
  public host: string = process.env.HOSTNAME || '0.0.0.0';

  constructor() {
    if (REF_HOLDER.lastApp) {
      REF_HOLDER.lastApp?.close();
    }
    REF_HOLDER.lastApp = this;
    this.app = express();
    this.port = extViewPort;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  close() {
    if (this.server) {
      this.server.close();
    }
  }

  public listen() {
    this.server = http.createServer(this.app);

    logger.info(`=================================`);
    logger.info(`🚀 Ext-View App listening on the port http://localhost:${this.port}`);
    logger.info(`=================================`);
    this.server.listen(this.port);
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() { }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      }),
    );
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
      try {
        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';

        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(status).json({ message });
      } catch (error) {
        next(error);
      }
    };

    this.app.use(ErrorMiddleware);
  }

  private initializeRoutes() {


    const pkgExtractDir = getLocalPkgExtract();
    const installedExts_flat_arr = getInstalledExtsFlatMode();
    for (let ext of installedExts_flat_arr) {
      if (!ext) {
        continue;
      }
      const currentExtRoot = path.join(pkgExtractDir, ext);
      logger.info('registering ext view path for ext: ' + ext + ', currentExtRoot: ' + currentExtRoot);
      const miaodaDistFileForThatExt = path.join(currentExtRoot, filename_miaoda_dist_file);
      // check exsit
      if (fs.existsSync(miaodaDistFileForThatExt)) {
        const miaodaConfig = JSON.parse(fs.readFileSync(miaodaDistFileForThatExt, 'utf8')) as MiaodaConfig;
        if (miaodaConfig.runtime) {
          switch (miaodaConfig.runtime.type) {
            case 'web-static-embedded':
              const embeddedConfig = miaodaConfig.runtime.embedded;
              // TODO: actually, currently we only support first static folder, for others havent supported it yet
              const selectedStaticDir = _.first(embeddedConfig.staticDirs);
              const serveStaticFolder = path.join(currentExtRoot, selectedStaticDir);
              const baseUrl = embeddedConfig.baseUrl;
              logger.info('serving static folder: ' + serveStaticFolder + ' at baseUrl: ' + baseUrl);
              this.app.use(baseUrl, express.static(serveStaticFolder, {
                lastModified: true,
                etag: true,
              }));
              this.app.get(baseUrl+'/*', (req, res) => {
                res.sendFile(path.resolve(serveStaticFolder, 'index.html'));
              });
              break;
            case 'web-static-standalone':
              throw new Error('web-static-standalone is not supported yet');
          }
        } else {
          logger.error('miaoda config file does not have runtime field, skip ' + ext);
          continue;
        }
      }
    }
    //

    this.app.use('/', (req, res) => {
      if (req.url == '/') {
        res.send({
          text: 'hello ext view app, it is a root path',
        });
      } else {
        req.next();
      }
    });
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}

export const fn_runOrRestartExtViewAppServer = () => {
  // it will be running once you call it
  const eva = new ExtViewApp();
  eva.listen();
};
