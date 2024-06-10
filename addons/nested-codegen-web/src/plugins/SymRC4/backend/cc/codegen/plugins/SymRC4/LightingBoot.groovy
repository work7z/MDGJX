
package cc.codegen.plugins.SymRC4

import cc.codegen.plugins.SymRC4.handler.SymRC4Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymRC4Handler()
        ]
    }
}
