
package cc.codegen.plugins.EncryptSM2

import cc.codegen.plugins.EncryptSM2.handler.EncryptSM2Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new EncryptSM2Handler()
        ]
    }
}
