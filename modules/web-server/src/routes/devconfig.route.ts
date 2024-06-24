import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import {  } from '@/i18n/TranslationUtils';
import { sendRes } from '@/commonSimpleRoutes';
import { KVUtils } from '@/utils/KVUtils';
import _ from 'lodash';

type ConfigItemType = {
  type: 'true_or_false',
  label: string;
  key: string;
  defaultValue: string;
  actualValue?: string; // can be null when setup
};
const type_using_cloud_type_for_ext_view = 'using-cloud-ext-type';

const CONFIG_ARR: ConfigItemType[] = [
  {
    type: 'true_or_false',
    label: '使用本地ext-view的模式',
    key: type_using_cloud_type_for_ext_view,
    defaultValue: 'false', // true or false
  },
];
_.forEach(CONFIG_ARR, (x, d, n) => {
  KVUtils.defaultIfNotExists(x.key, x.defaultValue);
});

export class DevConfigRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/devconfig/get-all', (req, res) => {
      sendRes(res, {
        data: CONFIG_ARR.map(x => {
          return {
            ...x,
            actualValue: KVUtils.get(x.key),
          };
        }),
      });
    });
    this.router.get('devconfig/set', (req, res) => {
      const { key, value } = req.query;
      const item = _.find(CONFIG_ARR, x => x.key === key);
      if (!item) {
        throw new Error('参数错误');
        return;
      }
      KVUtils.set(key + '', value + '');
      sendRes(res, {
        data: 1
      });
    });
  }
}
