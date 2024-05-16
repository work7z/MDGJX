import { expect, test } from 'vitest';
import { DataTypes, Model } from 'sequelize';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { logger } from '@/utils/logger';
import { rateUtils } from './unused_rateUtils';

test('run-limit-rate', async () => {
  // test wait function
  const finalArr: number[] = [];

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      rateUtils.wait('test', { timesPerSecond: 5 }).then(() => {
        finalArr.push(1);
      });
    }, 0);
  }
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, 3000);
  });
  expect(finalArr.length).toBe(100);
}, 0);
