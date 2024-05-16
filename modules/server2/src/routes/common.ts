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
import { S2User, S2UserHasGiftCardList, S2UserMembership } from '@/dao/model';
import { getSignatureFromStr } from './auth/auth';
import { logger } from '@/utils/logger';
import { fn_add_user_into_active } from './auth/user-types';
import _ from 'lodash';
import dao from '@/dao';

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
  verifyAuth(): Promise<[DisplayUserInfo | undefined, () => void]>;
  Dot: DotType;
  Info: RequestInfo;
  getCookie: (name: string) => string;
  setCookie: (name: string, value: string) => void;
};

export type DisplayUserInfo = {
  name: string;
  email: string;
  createdAt: Date;
  isProUser: boolean;
  proUserList: S2UserMembership[];
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
      let userInfo: DisplayUserInfo | undefined = undefined;
      const elb3AuthStr = req.header(HEADER_X_LAF_TOKEN);
      const daoRef = await dao();
      let verifySteps = [];
      if (!_.isEmpty(elb3AuthStr)) {
        verifySteps.push('authstr:' + elb3AuthStr);
        try {
          let [expiredTS, body, singature, version] = elb3AuthStr?.split('.') as string[];
          verifySteps.push('expiredTS:' + expiredTS);
          let crtTime = new Date();
          if (crtTime.getTime() > parseInt(expiredTS)) {
            verifySteps.push('expired. ' + crtTime.getTime() + '>' + parseInt(expiredTS));
            // do nothing
          } else {
            verifySteps.push('got-body:' + body);
            let c_sig = getSignatureFromStr(body);
            if (c_sig != singature) {
              verifySteps.push('signature not match');
              //   throw new Error('signature not match');
              // do nothing, of course you won't get the auth info
            } else {
              verifySteps.push('signature match');
              let push: Elb3AuthBody = JSON.parse(atob(body));
              let tmpUserInfo = await getUserInfoByUserAcctId(push.userAcctId + '');
              const proUserList = await S2UserMembership.findAll({
                where: {
                  userId: push.userAcctId,
                },
              });
              const proCardList = await S2UserHasGiftCardList.count({
                where: {
                  userId: push.userAcctId,
                },
              });
              if (tmpUserInfo && push.createTimestamp == tmpUserInfo.createdAt.getTime()) {
                verifySteps.push('user-info-match');
                userInfo = {
                  name: tmpUserInfo.name,
                  email: tmpUserInfo.email,
                  createdAt: tmpUserInfo.createdAt,
                  proUserList,
                  isProUser: proCardList != 0,
                };
              } else {
                verifySteps.push('user-info-not-match: ' + push.createTimestamp + '.' + tmpUserInfo.createdAt.getTime());
                verifySteps.push(JSON.stringify(push));
              }
            }
          }
        } catch (e) {
          // unable to decode, meaning it is not a valid elb3-auth
          logger.error('decode error' + e);
          verifySteps.push('decode error' + e);
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
            data: {
              verifySteps,
            },
          });
        },
      ];
    },
  };
};

export const sendRes = (res: Response, value: AsyncCreateResponse<any>) => {
  res.send(value);
};
