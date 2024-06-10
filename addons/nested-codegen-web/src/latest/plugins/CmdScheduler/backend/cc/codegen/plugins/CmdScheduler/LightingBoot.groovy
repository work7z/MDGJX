
package cc.codegen.plugins.CmdScheduler

import cc.codegen.plugins.CmdScheduler.handler.CmdSchedulerHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new CmdSchedulerHandler()
        ]
    }
}
