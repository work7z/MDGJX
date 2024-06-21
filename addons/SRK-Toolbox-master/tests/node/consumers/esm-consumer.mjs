/**
 * Tests to ensure that a consuming app can use ESM imports
 *
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */
import assert from "assert";
import chef from "srktoolbox";
import { bake, toHex, reverse, unique, multiply } from "srktoolbox";

const a = bake("Testing, 1 2 3", [
    toHex,
    reverse,
    {
        op: unique,
        args: {
            分隔符: "空格",
        }
    },
    {
        op: multiply,
        args: {
            分隔符: "空格",
        }
    }
]);

assert.equal(a.value, "630957449041920");

const b = chef.bake("Testing, 1 2 3", [
    chef.toHex,
    chef.reverse,
    {
        op: chef.unique,
        args: {
            分隔符: "空格",
        }
    },
    {
        op: chef.multiply,
        args: {
            分隔符: "空格",
        }
    }
]);

assert.equal(b.value, "630957449041920");
