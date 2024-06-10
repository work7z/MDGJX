
package cc.codegen.plugins.TextHelperShuffle

import cc.codegen.plugins.TextHelperShuffle.handler.TextHelperShuffleHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new TextHelperShuffleHandler()
        ]
    }
}
