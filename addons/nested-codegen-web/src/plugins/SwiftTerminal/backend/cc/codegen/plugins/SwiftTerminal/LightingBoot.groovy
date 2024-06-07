
package cc.codegen.plugins.SwiftTerminal

import cc.codegen.plugins.SwiftTerminal.handler.SwiftTerminalHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SwiftTerminalHandler()
        ]
    }
}
