
package cc.codegen.plugins.Caniuse

import cc.codegen.plugins.Caniuse.handler.CaniuseHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new CaniuseHandler()
        ]
    }
}

//                                                if (lastObj != null) {
//                                                    nextStatCrtMapArr.push(lastObj)
//                                                    lastObj = null;
//                                                }
//                                    def format_nextStatMapArr = []
//                                                nextStatCrtMapArr.each {
//                                                    if (it.ctn > 3 && it.prevTo != null && it.to != null) {
//                                                        format_nextStatMapArr.push([
//                                                                from : it.from,
//                                                                to   : it.prevTo,
//                                                                value: it.value,
//                                                        ])
//                                                        format_nextStatMapArr.push([
//                                                                from : it.to,
//                                                                value: it.value,
//                                                        ])
//                                                    } else {
//                                                        format_nextStatMapArr.push(it)
//                                                    }
//                                                }

//                                                    def fn_getLastObj = {
//                                                        return [
//                                                                from  : crtVerName,
//                                                                prevTo: null,
//                                                                to    : null,
//                                                                value : crtVerStatus,
//                                                                ctn   : 0,
//                                                        ]
//                                                    }
//                                                    if (lastObj == null) {
//                                                        lastObj = fn_getLastObj()
//                                                    } else {
//                                                        if (crtVerStatus != lastObj.value) {
//                                                            nextStatCrtMapArr.push(lastObj)
//                                                            lastObj = fn_getLastObj()
//                                                        } else {
//                                                            lastObj.prevTo = lastObj.to;
//                                                            lastObj.to = crtVerName;
//                                                            lastObj.ctn++
//                                                        }
//                                                    }
