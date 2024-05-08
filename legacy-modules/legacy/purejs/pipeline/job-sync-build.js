const crypto = require("crypto");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const directoryPath = path.join(__dirname, "../src");
console.log("directoryPath", directoryPath);
let prevMD5 = null;

function calculateMD5ForDirectory(dirPath) {
  let files = fs.readdirSync(dirPath);
  let hash = crypto.createHash("md5");

  files.forEach(function (file) {
    let filePath = path.join(dirPath, file);
    let fileData = fs.readFileSync(filePath);
    hash.update(fileData);
  });

  return hash.digest("hex");
}

setInterval(() => {
  let crtMD5 = calculateMD5ForDirectory(directoryPath);

  if (prevMD5 !== crtMD5) {
    console.log("File changed, start to build");
    prevMD5 = crtMD5;

    exec("./build-tsx.sh", (error, stdout, stderr) => {
      if (error) {
        console.log(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
}, 1000);
