import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { DotFn } from '@/i18n/TranslationUtils';
import { sendRes } from '@/commonSimpleRoutes';
import { isDevEnv } from '@/web2share-copy/env';
import _ from 'lodash';

const currentProjectRoot =process.env.MDGJX_EXT_ROOT

export type ExtModeSt = {
  isDev: boolean;
  repoPath: string;
}

export const getExtMode = ():ExtModeSt=>{
  return {
    isDev: isDevEnv() || !_.isNil(currentProjectRoot),
    repoPath: currentProjectRoot,
  };
}

export class ExtensionRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
     this.router.get('/ext/get-ext-mode', (req, res) => {
       sendRes(res, {
         data: getExtMode(),
       });
     });
    this.router.get('/ext/get-ext-list', (req, res) => {
      sendRes(res,{
        data: {
          version: '2024/06/14'
        }
      })
    });
  }
}
