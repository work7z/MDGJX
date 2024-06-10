
package cc.codegen.plugins.JSONProbe

import cc.codegen.plugins.JSONProbe.handler.JSONProbeHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new JSONProbeHandler()
        ]
    }
}
