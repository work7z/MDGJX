
package cc.codegen.plugins.FileSync

import cc.codegen.plugins.FileSync.handler.FileSyncHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new FileSyncHandler()
        ]
    }
}
