import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { S2GiftCard, S2UserHasGiftCardList } from '@/dao/model';
import { getCommonHandlePass, sendRes } from './common';
import { asyncHandler } from './AsyncHandler';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/user/getGiftCardList',
      asyncHandler(async (req, res) => {
        let p = getCommonHandlePass(req, res);
        const [user, errFn] = await p.verifyAuth();
        if (!user) {
          errFn();
          return;
        } else {
          const allCardListIHave = await S2UserHasGiftCardList.findAll({
            where: {
              userId: user.id,
            },
          });
          let cardList: S2GiftCard[] = await S2GiftCard.findAll({
            where: {
              giftCardCode: allCardListIHave.map(x => x.giftCardCode),
            },
          });
          sendRes(res, {
            data: cardList,
          });
        }
      }),
    );

    this.router.get(
      '/user/getFurtherAcctDetail',
      asyncHandler(async (req, res) => {
        let p = getCommonHandlePass(req, res);
        const [user, errFn, fn_furtherDetail] = await p.verifyAuth();
        if (!user) {
          errFn();
          return;
        } else {
          const detail = await fn_furtherDetail();
          sendRes(res, {
            data: detail,
          });
        }
      }),
    );
  }
}
