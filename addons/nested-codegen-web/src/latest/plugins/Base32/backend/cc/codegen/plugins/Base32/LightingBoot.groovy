
package cc.codegen.plugins.Base32

import cc.codegen.plugins.Base32.handler.Base32Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new Base32Handler()
        ]
    }
}
