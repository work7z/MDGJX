
package cc.codegen.plugins.SymPBEWithSHA1AndDESede

import cc.codegen.plugins.SymPBEWithSHA1AndDESede.handler.SymPBEWithSHA1AndDESedeHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymPBEWithSHA1AndDESedeHandler()
        ]
    }
}
