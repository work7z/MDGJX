import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import migrateDB from './jobs/background-job';
import { logger, stream } from '@utils/logger';
import path from 'path';
import { isDevEnv, isProductionEnv } from './web2share-copy/env';
import { API_SERVER_URL } from './web2share-copy/api_constants';
import { HttpException } from './exceptions/httpException';
import proxy from 'express-http-proxy';
import { existsSync } from 'fs';
import http from 'http';
export const asyncHandler = (fn: (req: Request, res: Response, next) => void) => (req: Request, res: Response, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
const env = NODE_ENV || 'development';

export const fn_getPort = () => {
  return process.env.PORT || ((env == 'development' ? 3050 : 39899) as number);
};
export const fn_getExtViewPort = (): number => {
  return parseInt(fn_getPort() + '') + 10;
};
export const fn_getExtViewPath = (): string => {
  return '/ext-view'; // for extensions page view, will redirect to internal ext view servers
};
const port = fn_getPort();
export const getExtStaticServer = () => {
  return process.env.EXTSTATIC_SERVER || 'https://extstatic.mdgjx.com';
};

let DIRECT_PROXY_SERVER = process.env.DIRECT_PROXY_SERVER || API_SERVER_URL;
let EXTSTATIC_SERVER = getExtStaticServer();
const INTERNAL_EXT_VIEW_SERVER = `http://127.0.0.1:${fn_getExtViewPort()}`;

import httpProxy from 'http-proxy';
import { fn_runOrRestartExtViewAppServer } from './ext-view-app';
var proxyWS = httpProxy
  .createProxyServer({
    target: DIRECT_PROXY_SERVER,
    ws: true,
    changeOrigin: true,
    //
  })
  .on('error', e => {
    logger.error('proxyWS error' + e);
  });
const launchTime = new Date();

export const isDesktopMode = port + '' > '40000';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public host: string = process.env.HOSTNAME || '0.0.0.0';

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = env;
    this.port = port;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    var server = http.createServer(this.app);

    // Proxy websockets
    server.on('upgrade', function (req, socket, head) {
      console.log('proxying upgrade request', req.url);
      proxyWS.ws(req, socket, head);
    });

    logger.info(`=================================`);
    logger.info(`======= ENV: ${this.env} =======`);
    logger.info(`======= HOST: ${this.host} =======`);
    logger.info(`======= EXTSTATIC_SERVER: ${EXTSTATIC_SERVER} =======`);
    logger.info(`======= DIRECT_PROXY_SERVER: ${DIRECT_PROXY_SERVER} =======`);
    logger.info(`🚀 App listening on the port http://localhost:${this.port}`);
    logger.info(`=================================`);
    server.listen(this.port);
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    // connect
  }

  private initializeMiddlewares() {
    const app = this.app;
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

  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      logger.info('route: ' + route.path);
      this.app.use('/local', route.router);
    });

    
    this.app.get('/killnow', (req, res) => {
      if (isDesktopMode) {
        process.exit(0);
      } else {
        res.send('not allowed');
      }
    });
    const app = this.app;

    const proxyPrefixArr = ['/v3', '/ws'];
    for (let i = 0; i < proxyPrefixArr.length; i++) {
      const prefix = proxyPrefixArr[i];
      logger.info('DIRECT_PROXY_SERVER: ' + DIRECT_PROXY_SERVER);
      app.use(
        prefix,
        proxy(DIRECT_PROXY_SERVER, {
          proxyReqPathResolver: function (req) {
            var parts = req.url.split('?');
            var queryString = parts[1];
            var updatedPath = parts[0];
            return prefix + updatedPath + (queryString ? '?' + queryString : '');
          },
        }),
      );
    }

    // setup ext-view app
    app.use(
      fn_getExtViewPath(),
      proxy(INTERNAL_EXT_VIEW_SERVER, {
        proxyReqPathResolver: function (req) {
          var parts = req.url.split('?');
          var queryString = parts[1];
          var updatedPath = parts[0];
          return fn_getExtViewPath() + updatedPath + (queryString ? '?' + queryString : '');
        },
      }),
    );

    // setup extstatic /ext-root
    const extStaticArr = ['/ext-root'];
    for (let i = 0; i < extStaticArr.length; i++) {
      const prefix = extStaticArr[i];
      app.use(
        prefix,
        proxy(EXTSTATIC_SERVER, {
          proxyReqPathResolver: function (req) {
            var parts = req.url.split('?');
            var queryString = parts[1];
            var updatedPath = parts[0];
            return prefix + updatedPath + (queryString ? '?' + queryString : '');
          },
        }),
      );
    }

    // setup spa
    let distDir = path.join(__dirname, 'spa');
    if (existsSync(distDir)) {
      // let us build this first
      this.app.use(express.static(distDir, { extensions: ['html'] }));
      // TODO: do seo stuff
      this.app.get('/*', (req, res) => {
        res.sendFile(path.resolve(distDir, 'index.html'));
      });
    }

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

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
