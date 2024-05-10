import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { DotFn } from '@/i18n/TranslationUtils';

export class MainRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/hello-world', (req, res) => {
      let Dot = DotFn(req);
      let str = Dot('HZEGO_YeW', 'This is a test string to say Hello World, is it ok?');
      res.send({
        version: '2024/04/02',
        content: str,
      });
    });
  }
}
