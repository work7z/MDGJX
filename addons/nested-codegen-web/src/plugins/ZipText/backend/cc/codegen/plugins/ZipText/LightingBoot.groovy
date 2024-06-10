
package cc.codegen.plugins.ZipText

import cc.codegen.plugins.ZipText.handler.ZipTextHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new ZipTextHandler()
        ]
    }
}
