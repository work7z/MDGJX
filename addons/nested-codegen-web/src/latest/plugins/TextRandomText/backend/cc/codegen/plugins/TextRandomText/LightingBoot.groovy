
package cc.codegen.plugins.TextRandomText

import cc.codegen.plugins.TextRandomText.handler.TextRandomTextHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new TextRandomTextHandler()
        ]
    }
}
