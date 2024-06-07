
package cc.codegen.plugins.IPAddrMasker

import cc.codegen.plugins.IPAddrMasker.handler.IPAddrMaskerHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new IPAddrMaskerHandler()
        ]
    }
}
