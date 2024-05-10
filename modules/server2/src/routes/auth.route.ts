import { Request, Response, Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { URL_AUTH_GET_CAPTCHA, URL_AUTH_GET_SIGNIN, URL_AUTH_GET_SIGNOUT, URL_AUTH_GET_SIGNUP } from '@/web2share-copy/server_urls';
import { DotFn, DotType } from '@/i18n/TranslationUtils';
import { InfoFn, RequestInfo } from '@/system/info';
import { AsyncCreateResponse, SignInCredentials, SysResponse, TypeCaptchaResponse } from './_types';
import { CaptchaService } from '@/services/captcha.service';
import { handleSignIn } from './auth/userAction';

export let getCookieGetterSetter = (req: Request, res: Response) => {
  let getCookie = (name: string) => {
    return req.cookies[name];
  };
  let setCookie = (name: string, value: string) => {
    res.cookie(name, value);
  };
  return { getCookie, setCookie };
};
export type CommonHandlePass = {
  Dot: DotType;
  Info: RequestInfo;
  getCookie: (name: string) => string;
  setCookie: (name: string, value: string) => void;
};
export let getCommonHandlePass = (req: Request, res: Response): CommonHandlePass => {
  let Dot = DotFn(req);
  let info = InfoFn(req);
  let { getCookie, setCookie } = getCookieGetterSetter(req, res);

  return {
    Dot,
    Info: info,
    getCookie,
    setCookie,
  };
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
    this.router.post(URL_AUTH_GET_SIGNIN, async (req, res) => {
      let p = getCommonHandlePass(req, res);
      let signInResult = await handleSignIn(req.body, p);
      res.send({
        content: signInResult,
      } satisfies SysResponse<AsyncCreateResponse<SignInCredentials | {}>>);
    });
    this.router.post(URL_AUTH_GET_SIGNUP, async (req, res) => {
      //
      res.send({
        content: 'not yet implemented',
      } satisfies SysResponse<any>);
    });
    this.router.post(URL_AUTH_GET_SIGNOUT, async (req, res) => {
      // can be done in front-end app
      res.send({
        content: 'not yet implemented',
      } satisfies SysResponse<any>);
    });
    this.router.get(URL_AUTH_GET_CAPTCHA, async (req, res) => {
      let p = await this.captcha.generate();
      res.send({
        content: p,
      } satisfies SysResponse<TypeCaptchaResponse>);
    });
  }
}
