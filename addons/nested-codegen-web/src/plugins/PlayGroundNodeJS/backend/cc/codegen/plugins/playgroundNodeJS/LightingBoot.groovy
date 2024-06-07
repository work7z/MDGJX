package cc.codegen.plugins.playgroundNodeJS

import cc.codegen.plugins.playgroundNodeJS.handler.PlayGroundBaseHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new PlayGroundBaseHandler()
        ]
    }
}
