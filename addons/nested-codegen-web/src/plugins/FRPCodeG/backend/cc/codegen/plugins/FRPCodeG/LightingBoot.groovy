
package cc.codegen.plugins.FRPCodeG

import cc.codegen.plugins.FRPCodeG.handler.FRPCodeGHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new FRPCodeGHandler()
        ]
    }
}
