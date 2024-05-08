// LafTools
// 
// Date: Thu, 22 Feb 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import fs from 'fs'
import path from 'path'
import os from 'os'
import fsutils from './FileUtils'
import { isDevEnv } from './env'

let userHome = os.homedir()

export let getUserHomeDir: () => string = () => {
    return userHome
}

export let getLafToolsDataDir = (): string => {
    let n = path.join(userHome, isDevEnv() ? '.dev-laftools' : '.laftools')
    return fsutils.mkdir(n)
}