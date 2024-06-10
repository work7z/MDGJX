
package cc.codegen.plugins.SymPBEWithSHA1AndRC240

import cc.codegen.plugins.SymPBEWithSHA1AndRC240.handler.SymPBEWithSHA1AndRC240Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymPBEWithSHA1AndRC240Handler()
        ]
    }
}
