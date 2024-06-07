
package cc.codegen.plugins.LoremC

import cc.codegen.plugins.LoremC.handler.LoremCHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new LoremCHandler()
        ]
    }
}
