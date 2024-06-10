
package cc.codegen.plugins.JSONFilter

import cc.codegen.plugins.JSONFilter.handler.JSONFilterHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new JSONFilterHandler()
        ]
    }
}
