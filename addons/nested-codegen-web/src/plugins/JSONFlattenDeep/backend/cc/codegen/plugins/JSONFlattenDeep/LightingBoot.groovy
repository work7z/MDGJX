
package cc.codegen.plugins.JSONFlattenDeep

import cc.codegen.plugins.JSONFlattenDeep.handler.JSONFlattenDeepHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new JSONFlattenDeepHandler()
        ]
    }
}
