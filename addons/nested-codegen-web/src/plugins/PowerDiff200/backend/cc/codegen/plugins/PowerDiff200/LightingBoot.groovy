
package cc.codegen.plugins.PowerDiff200

import cc.codegen.plugins.PowerDiff200.handler.PowerDiff200Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new PowerDiff200Handler()
        ]
    }
}
