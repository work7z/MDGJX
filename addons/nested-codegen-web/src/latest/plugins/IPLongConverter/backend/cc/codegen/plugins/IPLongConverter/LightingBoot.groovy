
package cc.codegen.plugins.IPLongConverter

import cc.codegen.plugins.IPLongConverter.handler.IPLongConverterHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new IPLongConverterHandler()
        ]
    }
}
