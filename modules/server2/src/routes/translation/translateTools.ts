import { sleep } from '@/jobs/migrate-db';
import { logger } from '@/utils/logger';
import { NothingFn } from '@/utils/unused_rateUtils';
import _ from 'lodash';

const tencentcloud = require('tencentcloud-sdk-nodejs-tmt');

const TmtClient = tencentcloud.tmt.v20180321.Client;

export type TLNRequest = {
  text: string;
  sourceLang: string;
  targetLang: string;
};
export type TLNRequestIdRes = {
  requestId: string;
};
export type TLNResponse = {
  result: string;
};
export type InternalTLNConfig = {
  secretId: string;
  secretKey: string;
  handleInfo: {
    processing: number;
    earliestTimestamp: number;
    waitObj: {
      [key: string]: NothingFn;
    };
  } | null;
};

let GetTLNConfigArr = (): InternalTLNConfig[] => {
  let TLNConfigArr: InternalTLNConfig[] = [];
  if (process.env.TLNKEY) {
    TLNConfigArr = JSON.parse(Buffer.from(process.env.TLNKEY, 'base64').toString());
  }
  return TLNConfigArr;
};

let TLNConfigArr = GetTLNConfigArr();
let tlnIdx = -1;

let getTLNClient = async (): Promise<[any, InternalTLNConfig]> => {
  // 实例化一个认证对象，入参需要传入腾讯云账户 SecretId 和 SecretKey，此处还需注意密钥对的保密
  // 代码泄露可能会导致 SecretId 和 SecretKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议采用更安全的方式来使用密钥，请参见：https://cloud.tencent.com/document/product/1278/85305
  // 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取
  tlnIdx++;
  if (tlnIdx < 0 || tlnIdx >= TLNConfigArr.length) {
    tlnIdx = 0;
  }
  const tlnConfig = TLNConfigArr[tlnIdx];

  const clientConfig = {
    credential: {
      secretId: tlnConfig.secretId,
      secretKey: tlnConfig.secretKey,
    },
    region: 'ap-guangzhou',
    profile: {
      httpProfile: {
        endpoint: 'tmt.tencentcloudapi.com',
      },
    },
  };

  // 实例化要请求产品的client对象,clientProfile是可选的
  const client = new TmtClient(clientConfig);
  return [client, tlnConfig];
};
export type TranslateResult = {
  result: string;
  errorCode?: string;
  isOK: boolean; // 1 ok 0 fail
};

const TranslateTools = {
  translateJSON: async (val: string, sourceLang: string, targetLang: string): Promise<TranslateResult> => {
    //
    return {
      result: '',
      isOK: true,
    };
  },
  translateText: async (val: string, sourceLang: string, targetLang: string): Promise<TranslateResult> => {
    const ATTEMPT_TIMES = _.size(TLNConfigArr) * 2;
    let crtTried = 0;
    while (crtTried++ < ATTEMPT_TIMES) {
      const [client, tlnConfig] = await getTLNClient();

      try {
        const params = {
          SourceText: val,
          Source: sourceLang,
          Target: targetLang,
          ProjectId: 0,
        };
        let result: TranslateResult = {
          isOK: false,
          result: '',
        };

        await new Promise((resolve, reject) => {
          client.TextTranslate(params).then(
            data => {
              console.log(data);
              result.isOK = true;
              result.result = data.TargetText;
              resolve(1);
            },
            err => {
              console.error('error', err);
              reject(err);
            },
          );
        });
        return result;
      } catch (e) {
        // Exceeded
        const code = e.code;
        logger.error(e + ': ' + code);
        if (code && code.indexOf('Exceeded') != -1) {
          // 再次尝试，限额问题
          await sleep(50);
        } else {
          return {
            isOK: false,
            result: '',
            errorCode: code,
          };
        }
      }
    }
  },
};
export default TranslateTools;
