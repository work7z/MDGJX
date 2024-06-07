
package cc.codegen.plugins.TextHelperUniquer

import cc.codegen.plugins.TextHelperUniquer.handler.TextHelperUniquerHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new TextHelperUniquerHandler()
        ]
    }
}
