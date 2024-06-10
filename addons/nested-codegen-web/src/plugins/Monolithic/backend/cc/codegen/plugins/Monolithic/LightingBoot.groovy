
package cc.codegen.plugins.Monolithic

import cc.codegen.plugins.Monolithic.handler.MonolithicHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new MonolithicHandler()
        ]
    }
}
