
package cc.codegen.plugins.SystemFormat

import cc.codegen.plugins.SystemFormat.handler.SystemFormatHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SystemFormatHandler()
        ]
    }
}
