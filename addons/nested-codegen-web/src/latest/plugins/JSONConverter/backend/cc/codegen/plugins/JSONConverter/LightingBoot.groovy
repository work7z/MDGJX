
package cc.codegen.plugins.JSONConverter

import cc.codegen.plugins.JSONConverter.handler.JSONConverterHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new JSONConverterHandler()
        ]
    }
}
