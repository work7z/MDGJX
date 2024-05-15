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
import { S2Feedback, S2User } from '@/dao/model';
import { getCommonHandlePass, sendRes } from './common';

export type TLNRequest = {
  text: string;
  sourceLang: string;
  targetLang: string;
};
export type TLNResponse = {
  result: string;
};
export type InternalTLNConfig = {
  secretId: string;
  secretKey: string;
};

export let GetTLNConfigArr = (): InternalTLNConfig[] => {
  let TLNConfigArr: InternalTLNConfig[] = [];
  if (process.env.TLNKEY) {
    TLNConfigArr = JSON.parse(Buffer.from(process.env.TLNKEY, 'base64').toString());
  }
  return TLNConfigArr;
};
let TLNConfigArr = GetTLNConfigArr();

export class TranslationRoute implements Routes {
  public router = Router();
  public auth = new AuthController();
  public captcha = new CaptchaService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/tln/handleText',
      asyncHandler(async (req, res) => {
        sendRes(res, {
          data: {
            result: 'hello, world',
          } satisfies TLNResponse,
        });
      }),
    );
    this.router.post(
      '/tln/handleJSON',
      asyncHandler(async (req, res) => {
        sendRes(res, {
          data: {
            result: 'hello, world',
          } satisfies TLNResponse,
        });
      }),
    );
  }
}
