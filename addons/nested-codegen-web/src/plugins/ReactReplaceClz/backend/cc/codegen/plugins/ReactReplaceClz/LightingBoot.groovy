
package cc.codegen.plugins.ReactReplaceClz

import cc.codegen.plugins.ReactReplaceClz.handler.ReactReplaceClzHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new ReactReplaceClzHandler()
        ]
    }
}
