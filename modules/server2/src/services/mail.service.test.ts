import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import { App } from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import { UserRoute } from '@routes/users.route';
import { sendMailTo, sendVerificationCode } from './mail.service';
import { DotFn, DotFnDefault } from '@/i18n/TranslationUtils';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Test-send-email', () => {
  it('justemail', async () => {
    sendVerificationCode(
      {
        mailToAddr: 'work7z@outlook.com',
        sendToWho: 'Tommy',
        verificationCode: '123456',
      },
      {
        Dot: DotFnDefault(),
      },
    );
  });
});
