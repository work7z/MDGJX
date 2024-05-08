// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import { Sequelize, } from 'sequelize';
import { SystemConfig as SystemConfig } from "./etc/types"
import fs from 'fs'
import path from 'path'
import { log } from 'console';
import { RedisClientType, createClient } from 'redis';
import { SystemEnvFlag, getLafELB3Root, getSysEnv, isDevEnv, isTestEnv } from '../share/env';
import model, { DB_VERSION, } from './model';
import refMap from './ref';
import kvUtils from '../utils/kvUtils';
import { getAppDatabaseMainFile } from '../share/appdir';

export type DaoRef = {
    db: Sequelize,
    redis: RedisClientType
}

let lock = false
let loadDAO = async (): Promise<DaoRef> => {
    console.log('initializing DAO Ref...')
    lock = true;
    try {
        let envFlag: SystemEnvFlag = getSysEnv()
        if (refMap[envFlag]) {
            return refMap[envFlag]
        }
        log("envFlag", envFlag)

        let appDatabase = getAppDatabaseMainFile()
        let sequelize = new Sequelize('', '', '', {
            dialect: 'sqlite',
            storage: appDatabase,
        })

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }


        let r: DaoRef = {
            redis: {} as any, // TODO: redis is not used in this project.
            db: sequelize,
        }

        console.log('established connection, setup model...')

        // 3. setup model 
        await model(r)

        // options
        let setKey = "sys-db-version"
        // check db version
        let currentVersion = await kvUtils.getKey(setKey)
        if (currentVersion && (
            currentVersion < DB_VERSION
        )) {
            console.log('db version not match, reset the db')
            await sequelize.sync({ force: true, alter: true })
            await kvUtils.setKey(setKey, DB_VERSION)
        }

        console.log('ok, setup the model')
        refMap[envFlag] = r;

        lock = false;

        return r
    } catch (e) {
        console.log('failed, got errors', e)
        lock = false;
        throw e;
    }
}
export default loadDAO