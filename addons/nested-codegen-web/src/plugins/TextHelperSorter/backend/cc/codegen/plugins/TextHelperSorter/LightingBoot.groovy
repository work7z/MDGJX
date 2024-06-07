
package cc.codegen.plugins.TextHelperSorter

import cc.codegen.plugins.TextHelperSorter.handler.TextHelperSorterHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new TextHelperSorterHandler()
        ]
    }
}
