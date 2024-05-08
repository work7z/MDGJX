import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { DotFn } from '@/i18n/TranslationUtils';

export class MainRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

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
