
package cc.codegen.plugins.MorseCode

import cc.codegen.plugins.MorseCode.handler.MorseCodeHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new MorseCodeHandler()
        ]
    }
}
