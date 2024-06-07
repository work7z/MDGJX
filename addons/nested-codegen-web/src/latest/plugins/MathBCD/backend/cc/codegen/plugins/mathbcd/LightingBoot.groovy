package cc.codegen.plugins.mathbcd

import cc.codegen.plugins.mathbcd.handler.BCDMathHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new BCDMathHandler()
        ]
    }
}
