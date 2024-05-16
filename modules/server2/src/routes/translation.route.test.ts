import { expect, test } from 'vitest';
import { DataTypes, Model } from 'sequelize';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import translateTools from './translation/translateTools';
import { logger } from '@/utils/logger';
import i18nItems from '@/i18n/i18n';

test('run-translation-route', async () => {
  const res = await translateTools.translateText('你好这个是测试', 'zh', 'en');
  logger.info('res: ' + JSON.stringify(res));
  if (!res.isOK) {
    throw new Error(res.errorCode);
  }
  expect(res.isOK).toBe(true);
}, 0);

test('run-translation-batchroute', async () => {
  for (let i = 0; i < 20; i++) {
    const res = await translateTools.translateText('你好这个是' + i + '个测试', 'zh', 'en');
    logger.info('res: ' + JSON.stringify(res));
    if (!res.isOK) {
      throw new Error(res.errorCode);
    }
    expect(res.isOK).toBe(true);
  }
}, 0);

test('run-translation-diffi18n-batchroute', async () => {
  for (let i = 0; i < _.size(i18nItems); i++) {
    let i18nItem = i18nItems[i];
    const res = await translateTools.translateText('你好这个是' + i + '个测试', 'zh', i18nItem.value);
    logger.info('res: ' + JSON.stringify(res));
    if (!res.isOK) {
      throw new Error(res.errorCode);
    }
    expect(res.isOK).toBe(true);
  }
}, 0);
