
package cc.codegen.plugins.SymDESede

import cc.codegen.plugins.SymDESede.handler.SymDESedeHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymDESedeHandler()
        ]
    }
}
