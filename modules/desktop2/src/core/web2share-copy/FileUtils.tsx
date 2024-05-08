// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import fs from 'fs';


let FileUtils = {
    fileExists: (file: string) => {
        return fs.existsSync(file)

    },
    dirExists: (dir: string) => {
        return fs.existsSync(dir)
    },
    mkdir: (dir: string): string => {
        if (fs.existsSync(dir)) {
            return dir;
        }
        fs.mkdirSync(dir, {
            recursive: true
        })
        return dir;
    },
}


export default FileUtils