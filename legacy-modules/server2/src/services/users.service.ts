import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { Test2 } from '@interfaces/users.interface';
import { S2User } from '@/dao/model';

@Service()
export class UserService {
  public async findAllUser(): Promise<Test2[]> {
    const allUser: Test2[] = await S2User.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<Test2> {
    const findUser: Test2 = await S2User.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<Test2> {
    const findUser: Test2 = await S2User.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Test2 = await S2User.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<Test2> {
    const findUser: Test2 = await S2User.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await S2User.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: Test2 = await S2User.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<Test2> {
    const findUser: Test2 = await S2User.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await S2User.destroy({ where: { id: userId } });

    return findUser;
  }
}
