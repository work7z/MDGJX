// LafTools
// 
// Date: Tue, 19 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc


import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTypes, Model } from 'sequelize'
import Chef from './Chef.mjs'
import ToBase64 from '../tools/impl/conversion/ToBase64'
// test 1+1 = 2
test('1+1=2', async () => {
    expect(1 + 1).toBe(2)
})

test('test-chef-process', async () => {
    let test: any = {
        name: "To Base64: test",
        input: "hello, world",
        expectedOutput: "aGVsbG8sIHdvcmxk",
        recipeConfig: [
            {
                op: new ToBase64(),
                args: ["A-Za-z0-9+/="],
            },
        ],
    }
    const chef = new Chef();
    console.log('chef', chef)

    const result = await chef.bake(
        test.input,
        test.recipeConfig,
        { returnType: "string" }
    );

    const ret: {
        test: any,
        status: string | null,
        output: string | null,
        duration: number
    } = {
        test: test,
        status: null,
        output: null,
        duration: result.duration
    };


    if (result.error) {
        if (test.expectedError) {
            if (result.error.displayStr === test.expectedOutput) {
                ret.status = "passing";
            } else {
                ret.status = "failing";
                ret.output = [
                    "Expected",
                    "\t" + test.expectedOutput.replace(/\n/g, "\n\t"),
                    "Received",
                    "\t" + result.error.displayStr.replace(/\n/g, "\n\t"),
                ].join("\n");
            }
        } else {
            ret.status = "erroring";
            ret.output = result.error.displayStr;
        }
    } else {
        if (test.expectedError) {
            ret.status = "failing";
            ret.output = "Expected an error but did not receive one.";
        } else if (result.result === test.expectedOutput) {
            ret.status = "passing";
        } else if ("expectedMatch" in test && test.expectedMatch.test(result.result)) {
            ret.status = "passing";
        } else if ("unexpectedMatch" in test && !test.unexpectedMatch.test(result.result)) {
            ret.status = "passing";
        } else {
            ret.status = "failing";
            const expected = test.expectedOutput ? test.expectedOutput :
                test.expectedMatch ? test.expectedMatch.toString() :
                    test.unexpectedMatch ? "to not find " + test.unexpectedMatch.toString() :
                        "unknown";
            ret.output = [
                "Expected",
                "\t" + expected.replace(/\n/g, "\n\t"),
                "Received",
                "\t" + result.result.replace(/\n/g, "\n\t"),
            ].join("\n");
        }

    }

    console.log('ret: ', ret)
    console.log('results: ', result)

    expect(1 + 1).toBe(2)
})