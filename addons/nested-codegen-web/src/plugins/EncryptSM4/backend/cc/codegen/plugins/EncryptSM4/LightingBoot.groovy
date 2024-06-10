
package cc.codegen.plugins.EncryptSM4

import cc.codegen.plugins.EncryptSM4.handler.EncryptSM4Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new EncryptSM4Handler()
        ]
    }
}
