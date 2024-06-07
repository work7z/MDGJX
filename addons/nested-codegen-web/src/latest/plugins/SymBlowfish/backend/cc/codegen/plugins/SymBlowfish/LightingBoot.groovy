
package cc.codegen.plugins.SymBlowfish

import cc.codegen.plugins.SymBlowfish.handler.SymBlowfishHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymBlowfishHandler()
        ]
    }
}
