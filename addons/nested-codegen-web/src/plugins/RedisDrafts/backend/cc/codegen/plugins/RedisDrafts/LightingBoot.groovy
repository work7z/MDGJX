
package cc.codegen.plugins.RedisDrafts

import cc.codegen.plugins.RedisDrafts.handler.RedisDraftsHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new RedisDraftsHandler()
        ]
    }
}
