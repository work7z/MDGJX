
package cc.codegen.plugins.IPLocalPortChecker

import cc.codegen.plugins.IPLocalPortChecker.handler.IPLocalPortCheckerHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new IPLocalPortCheckerHandler()
        ]
    }
}
