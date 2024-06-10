
package cc.codegen.plugins.QueryStringConversion

import cc.codegen.plugins.QueryStringConversion.handler.QueryStringConversionHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new QueryStringConversionHandler()
        ]
    }
}
