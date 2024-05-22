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
import TranslateTools, { TLNAIRequest, TLNRequest, TLNRequestIdRes, TLNResponse } from './translation/translateTools';
import i18nItems from '@/i18n/i18n';
import { randomUUID } from 'crypto';
import dao from '@/dao';
import AIUtils from './gpt/ai-utils';
import userAiUtils from './gpt/user-ai-utils';

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
        const { text = '', type, sourceLang, targetLang, extraRequests, reservedWords } = req.body as TLNRequest;
        if (text === '') {
          throw new Error('输入内容不能为空');
        }
        const usingAIMode = type == 'markdown';
        let resultText = '';
        let secretId = '';
        if (usingAIMode) {
          const resText = await userAiUtils.userSendAIReqAndRes(user, 'markdown', [
            {
              role: 'user',
              content: `
你是精通Markdown格式的翻译大师，并能熟练跳过代码和专用名词，你只做翻译的事情别的不要做，牢记！

这是从${sourceLang}转为${targetLang}的翻译请求：
${reservedWords ? `保留词列表(逗号隔开): ${reservedWords}` : '' || ''}
额外要求：${extraRequests || '无'}

根据上面要求，请你翻译以下Markdown并直接输出：
\`\`\`markdown
${text}
\`\`\`
      
      `,
            },
          ]);
          resultText = resText;
          secretId = 'qwen';
        } else {
          let obj = await TranslateTools.translateText(text, sourceLang, targetLang);
          if (!obj.isOK) {
            throw new Error('翻译失败: ' + obj.errorCode);
          }
          resultText = obj.result;
          secretId = obj.secretId || 'N/A ';
        }
        await S2TranslationRecord.create({
          userId: user.id,
          fromIP: req.ip,
          textCount: text.length,
          sourceLang: sourceLang,
          targetLang: targetLang,
          status: 0,
          handleType: type,
          // DO NOT CACHE SENSITIVE TRANSLATION RESULT HERE
          cachedText: '',
          processedText: '',
          secretId: secretId,
        });

        sendRes(res, {
          data: {
            result: resultText,
          } satisfies TLNResponse,
        });
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
