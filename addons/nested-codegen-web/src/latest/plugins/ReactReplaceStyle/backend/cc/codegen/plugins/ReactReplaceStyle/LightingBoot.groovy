
package cc.codegen.plugins.ReactReplaceStyle

import cc.codegen.plugins.ReactReplaceStyle.handler.ReactReplaceStyleHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new ReactReplaceStyleHandler()
        ]
    }
}
