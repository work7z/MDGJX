import { expect, test } from 'vitest'
import { DataTypes, Model } from 'sequelize'
import { logger } from "./utils/logger.js";
import AIUtils from "./utils/ai-utils";
import path from 'path';
import shelljs from 'shelljs';
import fs from 'fs'
import _ from 'lodash';
let postProcessFolder = path.join(__dirname, 'post-process');
shelljs.mkdir('-p', postProcessFolder);

test('run-conversions-ai-fetch-case', async () => {
  let currentFolder = path.join(postProcessFolder, "op-run-mjs-to-ts")
  shelljs.mkdir('-p', currentFolder)
  let sourceMJSFolder = path.join(
    process.env.LAFTOOLS_ROOT as string,
    ...'modules/web2/app/[lang]/client/src/impl/core/operations'.split("/")
  );
  logger.info("sourceMJSFolder: " + sourceMJSFolder)
  let allMJSFiles = shelljs.ls(sourceMJSFolder);
  for (let file of allMJSFiles) {
    let targetFile = path.join(currentFolder, "response__" + file.replace(".mjs", ".json"))
    // if targetFile exist and non-empty, then continue
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 0) {
      logger.info("file exists: " + targetFile)
      continue;
    }
    let content = shelljs.cat(path.join(sourceMJSFolder, file));
    let fileContent = content.toString();
    if (_.isEmpty(fileContent)) {
      throw new Error("file content is empty: " + file)
    }
    logger.info("file: " + file)

    let requireText = `将代码转换为TS代码，要求如下：
      
1. 要求给该Operation类添加一个方法，具体实现参照【示例1】自动推导，不能照抄，要按照当前Operation自动替换，并提供exampleInput和exampleOutput（假如你的exampleOutput无法提供具体值，请用<>把它包起来
2. 用英文概述本代码的功能和用途，并且填写到顶部注释"// Description:" 那一行里
3. 在本代码里找出所有显示给用户的自然文本(
    不包含http链接之类，也不包括exampleInput、exampleOutput、inputType、outputType、module、type字段，自然文本指的是显示给用户的文本

)，用Dot函数包裹起来，具体参照【示例2】
4. 源代码的所有import语句，不能有变动或者省略，输出之前记得再三检查
5. 不允许对某些代码进行省略，特别是不要出现类似【run method implementation remains unchanged】的情况


【示例1】
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'nothing', // keep it, don't change
      config: {
        "module": "Crypto",
        "description": "MD5 (Message-Digest 5) is a widely used hash function. It has been used in a variety of security applications and is also commonly used to check the integrity of files.<br><br>However, MD5 is not collision resistant and it isn't suitable for applications like SSL/TLS certificates or digital signatures that rely on this property.",
        "infoURL": "https://wikipedia.org/wiki/MD5",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      infoURL: 'https://en.wikipedia.org/wiki/MD5',
      nousenouseID: 'md5',
      optName: Dot("md5.textiDjMIo", "Generate {0} Hash", "MD5"),
      optDescription: Dot(
        "md5.desc.rxsHq",
        "This operation hashes data into an {0} hash.",
        "MD5"
      ),
      exampleInput: "", // Fill it if possible
      exampleOutput: "", // Fill it if possible
    }
  }

【示例2】
将
{
  a: "this is a text 3"
}
转换为
{
  a: Dot("teid3", "this is a text")
}
注意这个Dot函数的第一个参数是key，第二个参数是value，key是用来标识这个文本的，value是实际的文本内容



【具体代码】
${fileContent}
`;
    try {
      logger.info('asking zhipu for ' + requireText)
      logger.info("file: " + file)
      let r = await AIUtils.askZhipu([
        {
          role: "user",
          content: requireText,
        },
      ]);
      if (r && r.result) {
        logger.info("AI " + file + " replied: " + r.result);
        fs.writeFileSync(targetFile, JSON.stringify(r, null, 2));
      } else {
        throw new Error("AI " + file + " replied null")
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      logger.error(e);
    }
  }
  return;
}, {
  timeout: -1
})

test('run-conversions-ai-fetch-tojson', async () => {
  let currentFolder = path.join(postProcessFolder, "op-run-mjs-to-json-zh")
  shelljs.mkdir('-p', currentFolder)
  let sourceMJSFolder = path.join(
    process.env.LAFTOOLS_ROOT as string,
    ...'modules/web2/app/[lang]/client/src/impl/core/operations'.split("/")
  );
  logger.info("sourceMJSFolder: " + sourceMJSFolder)
  let allMJSFiles = shelljs.ls(sourceMJSFolder);
  for (let file of allMJSFiles) {
    let targetFile = path.join(currentFolder, "response__" + file.replace(".mjs", ".txt"))
    // if targetFile exist and non-empty, then continue
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 0) {
      logger.info("file exists: " + targetFile)
      continue;
    }
    let content = shelljs.cat(path.join(sourceMJSFolder, file));
    let fileContent = content.toString();
    if (_.isEmpty(fileContent)) {
      throw new Error("file content is empty: " + file)
    }
    logger.info("file: " + file)

    let requireText = `将代码进行提炼为json格式，要求如下：
      
1. 在本代码里找出所有显示给用户的自然文本(
    不包含http链接之类，也不包括exampleInput、exampleOutput、inputType、outputType、module、type字段，自然文本指的是显示给用户的文本
3，把这些文本放到一个object并命名i18n里，key是自然文本，value是123
4，根据你的理解，和该代码实际功能，用最贴切的语言，翻译i18n为中文，并且用来替换它的value值123
4，参考示例1，将json结果输出


【示例1】

{
  i18n: {
    // place your i18n here
  }
}

【具体代码】
${fileContent}
`;
    try {
      logger.info('asking zhipu for ' + requireText)
      logger.info("file: " + file)
      let r = await AIUtils.askZhipu([
        {
          role: "user",
          content: requireText,
        },
      ]);
      if (r && r.result) {
        logger.info("AI " + file + " replied: " + r.result);
        fs.writeFileSync(targetFile, r.result);
      } else {
        throw new Error("AI " + file + " replied null")
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      logger.error(e);
    }
  }
  return;
}, {
  timeout: -1
})





test('run-conversions-ai-fetch-tojson', async () => {
  let currentFolder = path.join(postProcessFolder, "op-run-mjs-to-readme-zh")
  let sourceMJSFolder = path.join(postProcessFolder, "op-run-mjs-to-json-zh");
  shelljs.mkdir('-p', currentFolder)
  logger.info("sourceMJSFolder: " + sourceMJSFolder)
  let allMJSFiles = shelljs.ls(sourceMJSFolder);
  for (let file of allMJSFiles) {
  }
  return;
}, {
  timeout: -1
})



// let text = `...根据上述文本...`;

// // 正则表达式定位最后一个JSON字符串
// let jsonRegex = /```json((.|\n)*?)```/g;
// let match;
// let lastJson = '';

// // 查找所有匹配项，并将最后一个匹配项的JSON内容保存起来
// while ((match = jsonRegex.exec(text)) !== null) {
//   lastJson = match[1]; // match[1]包含了捕获组中的JSON字符串（不包含```json和```）
// }

// // 尝试解析JSON（如果存在的话）
// let parsedJson;
// try {
//   parsedJson = JSON.parse(lastJson);
//   console.log(parsedJson);
// } catch (e) {
//   console.error('无法解析JSON：', e);
// }