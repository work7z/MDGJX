
package cc.codegen.plugins.SymRC6

import cc.codegen.plugins.SymRC6.handler.SymRC6Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymRC6Handler()
        ]
    }
}
