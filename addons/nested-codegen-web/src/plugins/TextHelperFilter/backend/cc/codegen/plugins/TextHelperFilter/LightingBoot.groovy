
package cc.codegen.plugins.TextHelperFilter

import cc.codegen.plugins.TextHelperFilter.handler.TextHelperFilterHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new TextHelperFilterHandler()
        ]
    }
}
