import { expect, test } from 'vitest';
import { DataTypes, Model } from 'sequelize';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import translateTools from './translation/translateTools';
import { logger } from '@/utils/logger';

test('run-translation-route', async () => {
  const res = await translateTools.translateText('你好这个是测试', 'zh', 'en');
  logger.info('res: ' + JSON.stringify(res));
});
