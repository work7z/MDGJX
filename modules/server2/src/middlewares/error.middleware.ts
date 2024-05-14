import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';
import { HttpException } from '@/exceptions/httpException';

export const ErrorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  console.log('got error');
  console.error(err.stack);

  // replace this with whatever UI you want to show the user
  res.status(500).send('Something broke!');

  // app.use((err, req, res, next) => {
  //   console.log('got error');
  //   console.error(err.stack);

  //   // replace this with whatever UI you want to show the user
  //   res.status(500).send('Something broke!');
  // });
  //   try {
  //     const status: number = error.status || 500;
  //     const message: string = error.message || 'Something went wrong';

  //     logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
  //     res.status(status).json({ message });
  //   } catch (error) {
  //     next(error);
  //   }
};
