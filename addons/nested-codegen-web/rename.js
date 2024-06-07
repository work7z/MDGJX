var path = require('path')
var fs = require('fs')
const fileName = process.env.FILENAME;

fs.readFileSync(fileName, { encoding: "utf-8" }, (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const file = data;
    const transformed = esbuild.transformSync(file, { loader: "jsx" });
    // fs.writeFileSync(fileName, transformed.code, { encoding: "utf-8" });
    console.log(transformed)
})