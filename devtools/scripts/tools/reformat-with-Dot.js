let path = require('path')
let os = require('os')
let fs = require('fs')
// get first arg 
let firstArg = process.argv[2]
console.log('first arg', firstArg)

let newLines = []

let uuid = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

fs.readFileSync(firstArg, { encoding: 'utf-8' }).toString().split(os.EOL).forEach((line) => {
    let dotstr = "Dot("
    let dotidx = line.indexOf(dotstr)
    let remainLinePart = line.substring(dotidx+dotstr.length)
    let nextScopeEndIdx=  remainLinePart.indexOf(")")
    if(remainLinePart.substring(0,nextScopeEndIdx).indexOf(",")==-1){
        if(dotidx!=-1){
            line = line.substring(0,dotidx)+"Dot(\""+uuid().substring(0,6)+"\","+remainLinePart
        }    
    }else{
        console.log('ignore handled line',line)
    }
    newLines.push(line)
})

fs.writeFileSync(firstArg+".tmp", newLines.join(os.EOL))