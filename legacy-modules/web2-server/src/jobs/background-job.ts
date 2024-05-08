import { logger } from '@/utils/logger';
import _ from 'lodash';

export let sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async () => {
  // lightweight job
};
