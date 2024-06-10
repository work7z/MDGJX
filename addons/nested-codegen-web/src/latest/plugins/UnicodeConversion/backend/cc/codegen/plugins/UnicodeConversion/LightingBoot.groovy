
package cc.codegen.plugins.UnicodeConversion

import cc.codegen.plugins.UnicodeConversion.handler.UnicodeConversionHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new UnicodeConversionHandler()
        ]
    }
}
