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
import { S2Feedback, S2TranslationRecord, S2User } from '@/dao/model';
import { getCommonHandlePass, sendRes } from './common';
import { TLNRequest, TLNRequestIdRes, TLNResponse } from './translation/translateTools';
import i18nItems from '@/i18n/i18n';
import { randomUUID } from 'crypto';

export class TranslationRoute implements Routes {
  public router = Router();
  public auth = new AuthController();
  public captcha = new CaptchaService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/tln/sendTLNRequest',
      asyncHandler(async (req, res) => {
        let p = getCommonHandlePass(req, res);
        const [user, errFn] = await p.verifyAuth();
        if (!user) return errFn();
        const { text = '', type, sourceLang, targetLang } = req.body as TLNRequest;
        const r = await S2TranslationRecord.create({
          userId: user.id,
          cachedText: text,
          textCount: text.length,
          sourceLang: sourceLang,
          targetLang: targetLang,
          status: 0,
          handleType: type,
          processedText: '',
        });
        const requestId = r.id + '';
        sendRes(res, {
          data: {
            requestId: requestId,
          } satisfies TLNRequestIdRes,
        });
      }),
    );

    this.router.get(
      '/tln/getTLNResult',
      asyncHandler(async (req, res) => {
        let p = getCommonHandlePass(req, res);
        const [user, errFn] = await p.verifyAuth();
        if (!user) return errFn();
        let requestId = req.body.requestId;
        const record = await S2TranslationRecord.findByPk(requestId);
        if (record && record.userId === user.id) {
          sendRes(res, {
            data: {
              result: record.processedText,
            } satisfies TLNResponse,
          });
        } else {
          throw new Error('invalid request');
        }
      }),
    );
    this.router.get(
      '/tln/getI18nItems',
      asyncHandler(async (req, res) => {
        sendRes(res, {
          data: i18nItems,
        });
      }),
    );
  }
}
