import { fn_getExtViewPath, fn_getExtViewPort } from './app';
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
import { logger, stream } from '@utils/logger';
import path from 'path';
import { isDevEnv, isProductionEnv } from './web2share-copy/env';
import { API_SERVER_URL } from './web2share-copy/api_constants';
import { HttpException } from './exceptions/httpException';
import proxy from 'express-http-proxy';
import { existsSync } from 'fs';
import http from 'http';

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
    const routes: Routes[] = [];
    if (REF_HOLDER.lastApp) {
      REF_HOLDER.lastApp?.close();
    }
    this.app = express();
    this.port = extViewPort;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  close() {
    if(this.server){
      this.server.close()
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

  private async connectToDatabase() {
  }

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

  private initializeRoutes(routes: Routes[]) {
    this.app.use(fn_getExtViewPath(), (req, res) => {
      res.send({
        text: 'hello ext view app',
      });
    });

    this.app.use('/', (req, res) => {
      if (req.url == '/') {
        res.send({
          text: 'hello ext view app',
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
  return new ExtViewApp();
};
