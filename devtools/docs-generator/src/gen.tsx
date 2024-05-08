import idx from './index'
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
console.log('idx', idx)
import i18nItems from './i18n-copy'

let rootDir = process.env.LAFTOOLS_ROOT;
console.log("rootDir", rootDir);
let markdownFiles = idx;
let filesDir = path.join(__dirname, '..', 'files')
let tokesnReplace = {
    "`": "@@BAKCTICK@@"
}

let pngSupportList = {
    'zh_CN': 1
}

_.forEach(i18nItems, eachI18nItem => {
    let language = eachI18nItem.Value;
    let pmap = {};
    if (language != 'en_US') {
        pmap = require(path.join(__dirname, '..', 'lang', language + '.json'))
    }
    let LangMap = {
        [language]: pmap
    }
    function formatResultWithReplacer(val = "", ...args) {
        if (_.isNil(args)) {
            args = [];
        }
        for (let index in args) {
            let tval = args[index];
            while (true) {
                let p = "{" + index + "}";
                val = (val + "").replace(p, tval);
                if (val.indexOf(p) == -1) {
                    break;
                }
            }
        }
        return val;
    }
    // DO NOT REMOVE DOT FUNCTION
    let Dot = function (id: string, enText: string, ...args: any[]): string {
        if (language == 'en_US') {
            return formatResultWithReplacer(enText, ...args);
        }
        let langmap = LangMap;
        let o = langmap[language];
        if (_.isNil(o)) {
            return formatResultWithReplacer(enText, ...args);
        }
        let preText = o[id];
        if (!_.isNil(preText)) {
            enText = preText;
        }

        let finResult = formatResultWithReplacer(enText, ...args);
        return finResult;
    }
    console.log(typeof Dot)
    // DO NOT REMOVE DOT FUNCTION


    _.forEach(markdownFiles, (eachMarkdownFiles) => {
        let interalConvertor = eachMarkdownFiles.interalConvertor
        console.log("handling... " + eachMarkdownFiles.fileName);
        let filePath = path.join(filesDir, eachMarkdownFiles.fileName);
        let fileContent = fs.readFileSync(filePath, 'utf8');
        _.forEach(tokesnReplace, (value, key) => {
            fileContent = fileContent.replace(new RegExp(key, 'g'), value)
        });

        // do NOT remove extraLang which is used in eval function
        let extraLang = pngSupportList[eachI18nItem.Value] ? '-' + eachI18nItem.Value : ''
        let lang = eachI18nItem.Value
        let previewURL = eachI18nItem.Value != 'zh_CN' ? 'laftools.dev' : 'laftools.cn'

        let noteForGenKey = "NOTE_FOR_GEN"
        if (fileContent.indexOf(noteForGenKey) == -1 && !eachMarkdownFiles.noGenerateText) {
            fileContent = noteForGenKey + '\n\n' + fileContent
        }

        fileContent = fileContent.replace(noteForGenKey, `<i>Note: \${Dot("Y-TXjTruC","This page is generated from LafTools internally.")}</i> <br/> ${_.chain(i18nItems).take(8).map(x => x.Value == lang ? `${x.LabelByLang}` : `[${x.LabelByLang}](/docs/${x.Value}/${eachMarkdownFiles.fileName})`).join("  |  ").value()} | [More](/docs/) <br/>`)
        fileContent = fileContent.replace(/\$\{lang\}/gi, lang)

        let arr = []

        let jsScript = `
        let text = \`${fileContent}\`
        arr.push(text)
    `
        eval(jsScript)
        console.log('generated for the language ', language)
        let finalContent: string = arr[0]

        _.forEach(tokesnReplace, (value, key) => {
            finalContent = finalContent.replace(new RegExp(value, 'g'), key)
        })
        finalContent = finalContent.replace(/\$\{lang\}/g, lang)

        if (interalConvertor) {
            finalContent = interalConvertor(finalContent, lang)
        }

        let rootDir = process.env.LAFTOOLS_ROOT || '';
        eachMarkdownFiles.destinations.forEach((eachDestination) => {
            let parentDir = path.join(rootDir, eachDestination, eachI18nItem.Value)
            if (!fs.existsSync(parentDir)) {
                fs.mkdirSync(parentDir);
            }
            let destinationPath = path.join(parentDir, eachMarkdownFiles.fileName);
            console.log('destinationPath: ', destinationPath)
            fs.writeFileSync(destinationPath, finalContent, 'utf8');
        });

        if (eachMarkdownFiles.root) {
            if (language == 'en_US') {
                fs.writeFileSync(path.join(rootDir, eachMarkdownFiles.fileName), finalContent);
            }
        }
    });
})
