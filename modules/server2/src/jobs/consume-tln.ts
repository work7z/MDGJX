import { logger } from '@/utils/logger';
import { sleep } from './migrate-db';
import { S2TranslationRecord } from '@/dao/model';

export const TLN_STATUS_OBJ: {
  CTN: number;
} = {
  CTN: 0, // if there's a update, please update this also
};

export default async () => {
  logger.info('Consume TLN job started');
  // while (true) {
  //   //
  // }
};
