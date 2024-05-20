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
import { isProductionEnv } from './web2share-copy/env';
import { API_SERVER_URL } from './web2share-copy/api_constants';
import { HttpException } from './exceptions/httpException';
import proxy from 'express-http-proxy';
import { existsSync } from 'fs';

export const asyncHandler = (fn: (req: Request, res: Response, next) => void) => (req: Request, res: Response, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
let DIRECT_PROXY_SERVER = process.env.DIRECT_PROXY_SERVER || API_SERVER_URL;

const launchTime = new Date();
export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public host: string = process.env.HOSTNAME || '0.0.0.0';

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = process.env.PORT || (this.env == 'development' ? 3050 : 39899);

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();

    migrateDB();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`======= HOST: ${this.host} =======`);
      logger.info(`======= DIRECT_PROXY_SERVER: ${DIRECT_PROXY_SERVER} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
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
    const prefix = '/v3';
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
    // setup spa
    let distDir = path.join(__dirname, 'spa');
    if (existsSync(distDir)) {
      // let us build this first
      this.app.use(express.static(distDir));
      this.app.get('/*', (req, res) => {
        res.sendFile(path.resolve(distDir, 'index.html'));
      });
    }
    // setup xtools
    let xToolsDir = path.join(__dirname, 'xtools');
    xToolsDir = 'C:\\Users\\jerrylai\\hmproject\\suodao-tools\\addons\\it-tools\\dist';
    if (existsSync(xToolsDir)) {
      this.app.use('/xtools', express.static(xToolsDir));
      this.app.get('/xtools/*', (req, res) => {
        res.sendFile(path.resolve(xToolsDir, 'index.html'));
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

    // // error handler
    // this.app.use(function (err, req, res, next) {
    //   if (err.name === 'UnauthorizedError') {
    //     res.status(401).send('invalid token...');
    //   } else {
    //     next();
    //   }
    // });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/v3', route.router);
    });
    this.app.use('/', (req, res) => {
      if (req.url == '/') {
        res.send({
          version: process.env.APP_VERSION || 'UnknownVersion',
          launchAt: launchTime,
        });
      } else {
        req.next();
      }
    });
  }

  private initializeSwagger() {
    //
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
