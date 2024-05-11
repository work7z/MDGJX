// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import fn from './index'

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTypes, Model } from 'sequelize'
import model from './model';

class TestUser extends Model {
    declare id: number;
}


test('Test Conn', async () => {
    let daoRef = await fn()

    let sequelize = daoRef.db
})



test('Test Conn', async () => {
    let daoRef = await fn()

    let sequelize = daoRef.db
})

test('Test Create and Mantain Table2', async () => {
    let daoRef = await fn()
    await model(daoRef)
    // let sequelize = daoRef.db
    // // sequelize.sync({ alter: true, })

    // TestUser.init({
    //     id: {
    //         type: DataTypes.INTEGER,
    //         autoIncrement: true,
    //         primaryKey: true
    //     }
    // }, { sequelize })

    // const user = new TestUser({ id: 1 });
    // user.id; // 1
})

// more cases for sequlize
test('Test Create and Mantain Table', async () => {
    let daoRef = await fn()

    // let sequelize = daoRef.db
    // sequelize.sync({ alter: true })

    // TestUser.init({
    //     id: {
    //         type: DataTypes.INTEGER,
    //         autoIncrement: true,
    //         primaryKey: true
    //     }
    // }, { sequelize })


    // let usersall = await TestUser.findAll();
    // usersall.forEach(x => {
    //     // x.destroy()
    // })

    // const user = new TestUser({ id: 1 });
    // user.id; // 1
    // user.save()

    // let users = await TestUser.findAll();
    // expect(users.length).toBe(1)

    // let user1 = users[0]
    // expect(user1.id).toBe(1)


    // let user2 = new TestUser()
    // user2.save()
    // users = await TestUser.findAll();
    // expect(users.length).toBe(2)

    // let anyEqId2 = false;
    // users.forEach(user => {
    //     if(user.id == 2){
    //         anyEqId2= true;
    //     }
    // })
    // expect(anyEqId2).toBe(true)

    // users = await TestUser.findAll();
    // expect(users.length).toBe(1)

    // user1.destroy()
})

