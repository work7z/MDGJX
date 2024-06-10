
package cc.codegen.plugins.SymPBEWithMD5AndDES

import cc.codegen.plugins.SymPBEWithMD5AndDES.handler.SymPBEWithMD5AndDESHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SymPBEWithMD5AndDESHandler()
        ]
    }
}
