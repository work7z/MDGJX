
package cc.codegen.plugins.RenderHandleBars

import cc.codegen.plugins.RenderHandleBars.handler.RenderHandleBarsHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new RenderHandleBarsHandler()
        ]
    }
}
