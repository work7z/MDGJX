// LafTools
// 
// Date: Sat, 2 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc



import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTypes, Model } from 'sequelize'
import { translateText } from './translateAction';
import { fn_Geti18n } from '../i18n-pure';


test('Test Translation Utils', async () => {
    let i18nItems = fn_Geti18n((a, ...b) => b[0]);

    for (let eachItem of i18nItems) {
        let v = await translateText('hello, this is a testing!', 'en', eachItem.Value)
        console.log('result', v)
        // TODO: add cases to check result
    }
}, 1000000);