package cc.codegen.plugins.playgroundGroovy

import cc.codegen.plugins.playgroundGroovy.handler.PlayGroundBaseHandler
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
