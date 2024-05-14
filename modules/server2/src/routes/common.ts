import { Request, Response, Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { URL_AUTH_GET_CAPTCHA, URL_AUTH_GET_SIGNIN, URL_AUTH_GET_SIGNOUT, URL_AUTH_GET_SIGNUP } from '@/web2share-copy/server_urls';
import { DotFn, DotType } from '@/i18n/TranslationUtils';
import { InfoFn, RequestInfo } from '@/system/info';
import { AsyncCreateResponse, HEADER_X_LAF_LANG, HEADER_X_LAF_TOKEN, SignInCredentials, SysResponse, TypeCaptchaResponse } from './_types';
import { CaptchaService } from '@/services/captcha.service';
import handleSignUp, { Elb3AuthBody, getUserInfoByUserAcctId, handleSignIn } from './auth/userAction';
import { asyncHandler } from './AsyncHandler';
import { S2User } from '@/dao/model';
import { getSignatureFromStr } from './auth/auth';
import { logger } from '@/utils/logger';
import { fn_add_user_into_active } from './auth/user-types';
import _ from 'lodash';

export let getCookieGetterSetter = (req: Request, res: Response) => {
  let getCookie = (name: string) => {
    return req.cookies[name];
  };
  let setCookie = (name: string, value: string) => {
    res.cookie(name, value);
  };
  return { getCookie, setCookie };
};
export type UserInfo = Partial<S2User>;
export type CommonHandlePass = {
  verifyAuth(): Promise<[UserInfo | undefined, () => void]>;
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
    verifyAuth: async function () {
      let userInfo: UserInfo | undefined = undefined;
      const elb3AuthStr = req.header(HEADER_X_LAF_TOKEN);
      if (!_.isEmpty(elb3AuthStr)) {
        try {
          let [expiredTS, body, singature, version] = elb3AuthStr?.split('.') as string[];
          let crtTime = new Date();
          if (crtTime.getTime() > parseInt(expiredTS)) {
            // do nothing
          } else {
            let c_sig = getSignatureFromStr(body);
            if (c_sig != singature) {
              //   throw new Error('signature not match');
              // do nothing, of course you won't get the auth info
            } else {
              let push: Elb3AuthBody = JSON.parse(atob(body));
              let tmpUserInfo = await getUserInfoByUserAcctId(push.userAcctId);
              if (tmpUserInfo && push.userName == tmpUserInfo.name) {
                userInfo = {
                  name: tmpUserInfo.name,
                  email: tmpUserInfo.email,
                  createdAt: tmpUserInfo.createdAt,
                };
              }
            }
          }
        } catch (e) {
          // unable to decode, meaning it is not a valid elb3-auth
          logger.error('decode error' + e);
          // if they have elb3-auth, but it is not valid, then we should remove it and redirect the user to /login
        }
      } else {
        // pass through
      }
      return [
        userInfo,
        () => {
          sendRes(res, {
            error: '401',
            data: {},
          });
        },
      ];
    },
  };
};

export const sendRes = (res: Response, value: AsyncCreateResponse<any>) => {
  res.send(value);
};
