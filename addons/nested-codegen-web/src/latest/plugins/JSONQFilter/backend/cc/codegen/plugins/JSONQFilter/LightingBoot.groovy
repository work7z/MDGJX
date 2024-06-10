
package cc.codegen.plugins.JSONQFilter

import cc.codegen.plugins.JSONQFilter.handler.JSONQFilterHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new JSONQFilterHandler()
        ]
    }
}
