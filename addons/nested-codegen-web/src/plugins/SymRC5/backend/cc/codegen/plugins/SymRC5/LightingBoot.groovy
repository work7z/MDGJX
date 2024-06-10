
package cc.codegen.plugins.SymRC5

import cc.codegen.plugins.SymRC5.handler.SymRC5Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymRC5Handler()
        ]
    }
}
