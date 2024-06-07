
package cc.codegen.plugins.DMLToJSON200

import cc.codegen.plugins.DMLToJSON200.handler.DMLToJSON200Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new DMLToJSON200Handler()
        ]
    }
}
