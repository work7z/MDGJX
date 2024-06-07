
package cc.codegen.plugins.TextASCIITools200

import cc.codegen.plugins.TextASCIITools200.handler.TextASCIITools200Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new TextASCIITools200Handler()
        ]
    }
}
