import { Request, Response, Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { URL_AUTH_GET_CAPTCHA, URL_AUTH_GET_SIGNIN, URL_AUTH_GET_SIGNOUT, URL_AUTH_GET_SIGNUP } from '@/web2share-copy/server_urls';
import { DotFn, DotFnDefault, DotType } from '@/i18n/TranslationUtils';
import { InfoFn, RequestInfo } from '@/system/info';
import { AsyncCreateResponse, HEADER_X_LAF_LANG, SignInCredentials, SysResponse, TypeCaptchaResponse } from './_types';
import { CaptchaService } from '@/services/captcha.service';
import handleSignUp, { getUserInfoByEmail, handleSignIn } from './auth/userAction';
import { asyncHandler } from './AsyncHandler';
import { S2SendMailVerifyCodeRecord, S2User } from '@/dao/model';
import { getCommonHandlePass, sendRes } from './common';
import { randomUUID } from 'crypto';
import { logger } from '@/utils/logger';
import { MailService, sendVerificationCode } from '@/services/mail.service';

export type DisplayUserInfo = {
  name: string;
  email: string;
  createAt: Date;
};

export type FindPwReq = {
  email: string;
  password: string;
  confirmPassword: string;
};
export type FindPwRes = {
  data: {};
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
    this.router.post(
      '/auth/findpw',
      asyncHandler(async (req, res) => {
        let p = getCommonHandlePass(req, res);
        let { email, password, confirmPassword } = req.body;
        const result = {
          sentAt: new Date().getTime(),
        };
        let userInfo = await getUserInfoByEmail(email);
        if (password !== confirmPassword) {
          sendRes(res, {
            data: result,
            error: '密码两次确认不一致',
          });
          return;
        }
        if (userInfo) {
          let randomID = randomUUID().toString();
          // check if this email has created more than 5 times in 1 day
          let count = await S2SendMailVerifyCodeRecord.count({
            where: {
              mailaddr: email,
              createdAt: {
                $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
              },
            },
          });
          if (count > 5) {
            logger.error(email + 'has created more than 5 times in 1 day');
            sendRes(res, {
              data: result,
            });
            return;
          }
          // check if this fromIP has created more than 5 times in 1 day
          count = await S2SendMailVerifyCodeRecord.count({
            where: {
              fromIP: p.fromIP,
              createdAt: {
                $gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
              },
            },
          });
          if (count > 20) {
            logger.error(email + ' / ' + p.fromIP + 'has created more than 20 times in 1 day');
            sendRes(res, {
              data: result,
            });
            return;
          }
          // 随机6位数字
          let vCode = Math.floor(Math.random() * 1000000).toString();
          await S2SendMailVerifyCodeRecord.create({
            randomID: '',
            fromIP: p.fromIP,
            mailaddr: email,
            verifyCode: randomID,
            status: 1,
            newPassword: password,
          });
          sendVerificationCode(
            {
              mailToAddr: 'work7z@outlook.com',
              sendToWho: userInfo.name,
              verificationCode: vCode,
            },
            {
              Dot: DotFnDefault(),
            },
          );
        }
        sendRes(res, {
          data: result,
        });
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
          sendRes(res, {
            data: user,
          });
        }
      }),
    );
  }
}
