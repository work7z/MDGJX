import { Request, Response, Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { URL_AUTH_GET_CAPTCHA, URL_AUTH_GET_SIGNIN, URL_AUTH_GET_SIGNOUT, URL_AUTH_GET_SIGNUP } from '@/web2share-copy/server_urls';
import { DotFn, DotType } from '@/i18n/TranslationUtils';
import { InfoFn, RequestInfo } from '@/system/info';
import { AsyncCreateResponse, HEADER_X_LAF_LANG, SignInCredentials, SysResponse, TypeCaptchaResponse } from './_types';
import { CaptchaService } from '@/services/captcha.service';
import handleSignUp, { handleSignIn } from './auth/userAction';
import { asyncHandler } from './AsyncHandler';
import { S2User } from '@/dao/model';
import { getCommonHandlePass, sendRes } from './common';

export type DisplayUserInfo = {
  name: string;
  email: string;
  createAt: Date;
};

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();
  public captcha = new CaptchaService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // TODO: using JWT token for authentication
    this.router.post(
      URL_AUTH_GET_SIGNIN,
      asyncHandler(async (req, res) => {
        let p = getCommonHandlePass(req, res);
        let signInResult = await handleSignIn(req.body, p);
        res.send(signInResult);
      }),
    );
    this.router.post(
      URL_AUTH_GET_SIGNUP,
      asyncHandler(async (req, res) => {
        let p = getCommonHandlePass(req, res);
        let signUpResult = await handleSignUp(req.body, p);
        res.send(signUpResult);
      }),
    );
    this.router.get(
      '/auth/getUserInfo',
      asyncHandler(async (req, res) => {
        let p = getCommonHandlePass(req, res);
        const [user, errFn] = await p.verifyAuth();
        if (!user) {
          errFn();
          return;
        } else {
          res.send({
            helloWorld: 1234,
          });
        }
      }),
    );
  }
}
