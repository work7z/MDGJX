
package cc.codegen.plugins.FileArchive

import cc.codegen.plugins.FileArchive.handler.FileArchiveHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new FileArchiveHandler()
        ]
    }
}
