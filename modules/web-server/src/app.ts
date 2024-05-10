import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import migrateDB from './jobs/background-job';
import { logger, stream } from '@utils/logger';
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
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
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
