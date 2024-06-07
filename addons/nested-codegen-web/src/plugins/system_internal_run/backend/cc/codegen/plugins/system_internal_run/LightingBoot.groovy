
package cc.codegen.plugins.system_internal_run

import cc.codegen.plugins.system_internal_run.handler.system_internal_runHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new system_internal_runHandler()
        ]
    }
}
