import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Test2 } from '@interfaces/users.interface';
import { isDevEnv } from '@/web2share-copy/env';
import path from 'path';
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';
import dao from '@/dao';
import { TypeCaptchaResponse } from '@/web2share-copy/server_constants';

const createToken = (user: Test2): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

@Service()
export class CaptchaService {
  public async generate(): Promise<TypeCaptchaResponse> {
    let daoRef = await dao();
    let random = Math.floor(Math.random() * 10);
    console.log('route captcha GET', random);
    let randomID = 'VC-' + randomUUID().toString();
    daoRef.redis.setEx(randomID, 60 * 10, random + ''); // expire in 10 minutes
    let imgBase64 = getImgBase64(random);
    return {
      randomID,
      imgBase64,
    };
  }
}

export let getPreCompiledDir = (): string => {
  let file = isDevEnv() ? path.join(process.env.LAFTOOLS_ROOT, 'devtools', 'precompiled', 'dev') : '/opt/app/precompiled';
  return file;
};

export let getImgBase64 = (random: number): any => {
  let file = path.join(getPreCompiledDir(), `${random}.png`);
  let b = readFileSync(file, { encoding: 'base64' });
  return b;
};

export let getImgBase64Result = (random: number): string => {
  let file = path.join(getPreCompiledDir(), `${random}.txt`);
  let b = readFileSync(file, 'utf-8');
  return b;
};
