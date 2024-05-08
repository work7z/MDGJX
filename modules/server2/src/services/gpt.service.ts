import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { Test2 } from '@interfaces/users.interface';

@Service()
export class GPTService {}
