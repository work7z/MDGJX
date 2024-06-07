
package cc.codegen.plugins.SymRC2

import cc.codegen.plugins.SymRC2.handler.SymRC2Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymRC2Handler()
        ]
    }
}
