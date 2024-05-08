// LafTools
// 
// Date: Thu, 7 Mar 2024
// Description:
// License: AGPLv3
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc

import _ from 'lodash'
let VerCompareUtils = {
    removeAlphaOrBeta: function (version: string) {
        return _.split(version, '-')[0].replace("V", "v").replace("v", "")
    },
    isNewVersion: function (crtVer: string, newVer: string): boolean {
        return VerCompareUtils.removeAlphaOrBeta(crtVer) < VerCompareUtils.removeAlphaOrBeta(newVer)
    }
}
export default VerCompareUtils