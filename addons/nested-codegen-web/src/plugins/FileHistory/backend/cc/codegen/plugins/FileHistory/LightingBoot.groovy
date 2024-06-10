
package cc.codegen.plugins.FileHistory

import cc.codegen.plugins.FileHistory.handler.FileHistoryHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new FileHistoryHandler()
        ]
    }
}
