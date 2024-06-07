
package cc.codegen.plugins.RenderDoT

import cc.codegen.plugins.RenderDoT.handler.RenderDoTHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new RenderDoTHandler()
        ]
    }
}
