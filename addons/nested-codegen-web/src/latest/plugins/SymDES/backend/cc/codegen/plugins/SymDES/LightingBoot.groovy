
package cc.codegen.plugins.SymDES

import cc.codegen.plugins.SymDES.handler.SymDESHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymDESHandler()
        ]
    }
}
