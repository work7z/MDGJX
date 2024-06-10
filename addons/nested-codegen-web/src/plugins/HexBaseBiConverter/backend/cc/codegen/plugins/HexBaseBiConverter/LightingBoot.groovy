
package cc.codegen.plugins.HexBaseBiConverter

import cc.codegen.plugins.HexBaseBiConverter.handler.HexBaseBiConverterHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new HexBaseBiConverterHandler()
        ]
    }
}
