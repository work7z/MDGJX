
package cc.codegen.plugins.SymAES

import cc.codegen.plugins.SymAES.handler.SymAESHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymAESHandler()
        ]
    }
}
