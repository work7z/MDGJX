
package cc.codegen.plugins.NamePubC

import cc.codegen.plugins.NamePubC.handler.NamePubCHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new NamePubCHandler()
        ]
    }
}
