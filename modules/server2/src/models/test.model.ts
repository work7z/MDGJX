import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Test2 } from '@interfaces/users.interface';

export type Test2CreationAttributes = Optional<Test2, 'id' | 'email' | 'password'>;

export class Test2Model extends Model<Test2, Test2CreationAttributes> implements Test2 {
  public id: number;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Test2Model {
  Test2Model.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'tests2',
      sequelize,
    },
  );

  return Test2Model;
}
