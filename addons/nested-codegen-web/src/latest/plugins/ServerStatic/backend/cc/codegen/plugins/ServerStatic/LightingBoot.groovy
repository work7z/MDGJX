
package cc.codegen.plugins.ServerStatic

import cc.codegen.plugins.ServerStatic.handler.ServerStaticHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new ServerStaticHandler()
        ]
    }
}
