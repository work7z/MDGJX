
package cc.codegen.plugins.WebWorld

import cc.codegen.plugins.WebWorld.handler.WebWorldHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new WebWorldHandler()
        ]
    }
}
