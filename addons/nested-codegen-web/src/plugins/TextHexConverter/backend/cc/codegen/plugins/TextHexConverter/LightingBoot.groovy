
package cc.codegen.plugins.TextHexConverter

import cc.codegen.plugins.TextHexConverter.handler.TextHexConverterHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new TextHexConverterHandler()
        ]
    }
}
