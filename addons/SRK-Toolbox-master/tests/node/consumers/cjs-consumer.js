/**
 * Tests to ensure that a consuming app can use CJS require
 *
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 *
 * Modified by Raka-loah@github for zh-CN i18n
 */

const assert = require("assert");

require("srktoolbox").then(chef => {

    const d = chef.bake("Testing, 1 2 3", [
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

    assert.equal(d.value, "630957449041920");

});
