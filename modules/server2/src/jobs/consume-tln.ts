import { logger } from '@/utils/logger';
import { sleep } from './migrate-db';
import { S2TranslationRecord } from '@/dao/model';

export const TLN_STATUS_OBJ: {
  CTN: number;
} = {
  CTN: 0, // if there's a update, please update this also
};

export default async () => {
  // keep consuming the tln in DB
  // logger.info('Consume TLN job started');
  // let lastCtn = -1;
  // while (true) {
  //   let currentCtn = TLN_STATUS_OBJ.CTN;
  //   if (lastCtn == currentCtn) {
  //     await sleep(50);
  //   }
  //   try {
  //     const allUnprocessedRecord = await S2TranslationRecord.findAll({
  //       where: {
  //         status: 0,
  //       },
  //     });
  //     lastCtn = TLN_STATUS_OBJ.CTN;
  //   } catch (e) {
  //     logger.error(e);
  //   }
  //   await sleep(50);
  // }
};
