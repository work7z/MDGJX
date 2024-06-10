
package cc.codegen.plugins.CDNTool100

import cc.codegen.plugins.CDNTool100.handler.CDNTool100Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new CDNTool100Handler()
        ]
    }
}
