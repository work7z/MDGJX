
package cc.codegen.plugins.ASymRSA

import cc.codegen.plugins.ASymRSA.handler.ASymRSAHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new ASymRSAHandler()
        ]
    }
}
