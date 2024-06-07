
package cc.codegen.plugins.TimeCrontab

import cc.codegen.plugins.TimeCrontab.handler.TimeCrontabHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new TimeCrontabHandler()
        ]
    }
}
