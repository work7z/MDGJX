
package cc.codegen.plugins.SymARCFOUR

import cc.codegen.plugins.SymARCFOUR.handler.SymARCFOURHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymARCFOURHandler()
        ]
    }
}
