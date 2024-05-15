import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import request from 'supertest';
import { App } from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import { UserRoute } from '@routes/users.route';
import { DotFn, DotFnDefault } from '@/i18n/TranslationUtils';
import { GetTLNConfigArr } from './translation.route';
let configArr = GetTLNConfigArr();

// describe('Test-send-translation', () => {
//   it('do-translation', async () => {
//     console.log('configarr', configArr);
//     // ok, good
//   });
// });
