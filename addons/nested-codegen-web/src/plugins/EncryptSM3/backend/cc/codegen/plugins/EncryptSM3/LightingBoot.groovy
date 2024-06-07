
package cc.codegen.plugins.EncryptSM3

import cc.codegen.plugins.EncryptSM3.handler.EncryptSM3Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new EncryptSM3Handler()
        ]
    }
}
