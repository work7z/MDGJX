
package cc.codegen.plugins.TextHanTools200

import cc.codegen.plugins.TextHanTools200.handler.TextHanTools200Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new TextHanTools200Handler()
        ]
    }
}
