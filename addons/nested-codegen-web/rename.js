import fs from "fs";

const fileName = process.argv[2];
console.log('doing ' +fileName)


const data = fs.readFileSync(fileName, { encoding: "utf-8" });
    fs.writeFileSync(fileName.replace(".js", ".jsx"),data);
fs.unlinkSync(fileName);