import dao from '@/dao';
import { S2GiftCard, S2User, S2UserHasGiftCardList, S2UserPurchaseItem } from '@/dao/model';
import { logger } from '@/utils/logger';
import _ from 'lodash';
import moment from 'moment';

export let sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async () => {
  try {
    logger.info('Migrating database...');
    let daoRef = await dao();

    let sendGiftCard = async (USER_ID: number, giftCardsCount: number, thanksReasonType: 'PURCHASE' | 'SEED_USER', HELP_DATE: string) => {
      await daoRef.db_s2.transaction(async () => {
        for (let i = 0; i < giftCardsCount; i++) {
          let giftCardCode = 'CODEGEN-' + Math.random().toString(36).substring(2, 19).toUpperCase() + '-' + HELP_DATE.replace(/-/g, '');
          await S2GiftCard.create({
            giftCardType: 'THANKS_FOR_FUNDRAISING',
            giftCardCode: giftCardCode,
            usedByWho: -1,
            sourceType: 'INITIAL_GIFT_CARD',
            totalDays: 365 * 100,
            remarks:
              '感谢您曾在本工具箱起步时帮助我们，我们为您提供了一张永久会员礼品卡，您可以在LafTools工具箱中使用该卡享受永久会员权益，或者转赠给您的亲朋好友。',
          });
          await S2UserHasGiftCardList.create({
            userId: USER_ID,
            giftCardCode: giftCardCode,
            thanksToFundrasingDate: HELP_DATE,
            thanksReasonType: thanksReasonType,
          });
        }
      });
    };
    // handling users
    let [allUsers] = await daoRef.db_work7z.query('select * from user');
    for (let eachUser of allUsers) {
      let userID = eachUser['ID'];
      let USER_NAME = eachUser['USER_NAME'];
      let USER_PW_MD5 = eachUser['USER_PW_MD5'];
      let matchedUsers = await S2User.findAll({
        where: {
          name: USER_NAME,
        },
      });
      if (_.isEmpty(matchedUsers)) {
        logger.info('Migrating user: ' + USER_NAME);
        await S2User.create({
          id: userID,
          name: USER_NAME,
          email: eachUser['EMAIL'],
          password: USER_PW_MD5,
          phoneNumber: '', // TODO: provide phoneNumber verification method
          createdAt: eachUser['CREATE_DATE'],
        });
      } else {
        logger.debug('User already exists: ' + USER_NAME);
      }
    }
    // assigning premium membership
    let [allOrders] = await daoRef.db_work7z.query(`
select a.* from (
	select USER_ID,sum(MONEY_CNY*PURCHASE_YEAR) as SUMCNY,min(create_time) HELP_DATE from USER_ORDER_LIST uol where 1=1 and IS_PAID =1 group by USER_ID
) a order by SUMCNY desc
    `);
    for (let eachOrder of allOrders) {
      eachOrder['HELP_DATE'] = moment(eachOrder['HELP_DATE']).format('YYYY-MM-DD');
      let pCtn = await S2UserHasGiftCardList.count({
        where: {
          thanksReasonType: 'PURCHASE',
          thanksToFundrasingDate: eachOrder['HELP_DATE'],
          userId: eachOrder['USER_ID'],
        },
      });
      // 10
      if (pCtn > 0) {
        logger.debug('already patched the gift card list for user: ' + eachOrder['USER_ID']);
        continue;
      } else {
        let { USER_ID, SUMCNY, HELP_DATE } = eachOrder as any;
        let giftCardsCount = Math.floor(SUMCNY / 6) + 1;
        await sendGiftCard(USER_ID, giftCardsCount, 'PURCHASE', HELP_DATE);
      }
    }
    // assigning premium membership according to the current table
    let [allMemberships] = await daoRef.db_work7z.query(`select * from user_premium_rights upr where REASON != 'USER_PAYMENT'`);
    for (let eachMembership of allMemberships) {
      let { USER_ID, CREATE_TIME } = eachMembership as any;
      let HELP_DATE = moment(CREATE_TIME).format('YYYY-MM-DD');
      let pCtn = await S2UserHasGiftCardList.count({
        where: {
          thanksReasonType: 'SEED_USER',
          thanksToFundrasingDate: HELP_DATE,
          userId: USER_ID,
        },
      });
      // 10
      if (pCtn > 0) {
        logger.debug('already patched the gift card list for premium: ' + USER_ID);
        continue;
      } else {
        let giftCardsCount = 1;
        await sendGiftCard(USER_ID, giftCardsCount, 'SEED_USER', HELP_DATE);
      }
    }
  } catch (e) {
    logger.error('Error migrating database: ' + e);
  }
};
