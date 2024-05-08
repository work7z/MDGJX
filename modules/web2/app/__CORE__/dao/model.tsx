// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import {
    Sequelize, DataTypes, Model, InferCreationAttributes, InferAttributes, CreationOptional
} from 'sequelize';
import { DaoRef } from './index'
import { isDevEnv } from '../share/env';

export const DB_VERSION = "v4"

// model for local user
export class LocalUser extends Model<InferAttributes<LocalUser>, InferCreationAttributes<LocalUser>> {
    declare id: number;
    declare userId: string;
    declare username: string;
    declare password: string; // lock LafTools
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}


export default async (daoRef: DaoRef) => {
    let sequelize = daoRef.db


    await LocalUser.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: false,
        modelName: "LocalUser",
        tableName: "local_user"
    })

}