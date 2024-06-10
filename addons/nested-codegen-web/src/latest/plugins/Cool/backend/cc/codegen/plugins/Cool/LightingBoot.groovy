
package cc.codegen.plugins.Cool

import cc.codegen.plugins.Cool.handler.CoolHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new CoolHandler()
        ]
    }
}
