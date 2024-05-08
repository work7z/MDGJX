import { Sequelize, } from 'sequelize';
import fs from 'fs'
import path from 'path'
import { log } from 'console';
import { RedisClientType, createClient } from 'redis';
import model from './model';
import refMap from './ref';
import { SystemEnvFlag } from '@/hooks/env';
import { work7z_sequelize, newSeq, s2_sequelize } from '@/database';
import { isDevEnv } from '@/web2share-copy/env';


export type DaoRef = {
    db_work7z: Sequelize,
    db_s2: Sequelize,
    redis: RedisClientType
}



let lock = false
let loadDAO = async (): Promise<DaoRef> => {
    console.log('initializing DAO Ref...')
    lock = true;
    try {
        let sequelize_work7z = work7z_sequelize
        let sequelize_s2 = s2_sequelize

        // 2. redis
        const client = await createClient({
            url: isDevEnv() ? 'redis://localhost:6379' : 'redis://172.17.0.1:6379'
        })
            .on('error', err => console.log('Redis Client Error', err))
            .connect();

        let r: DaoRef = {
            redis: client as any,
            db_work7z: sequelize_work7z,
            db_s2: sequelize_s2,
        }

        console.log('established connection, setup model...')

        // 3. setup model 
        await model(r)

        console.log('ok, setup the model')

        lock = false;

        return r
    } catch (e) {
        console.log('failed, got errors', e)
        lock = false;
        throw e;
    }
}
export default loadDAO