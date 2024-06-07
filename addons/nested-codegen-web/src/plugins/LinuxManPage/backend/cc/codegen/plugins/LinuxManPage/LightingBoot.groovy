
package cc.codegen.plugins.LinuxManPage

import cc.codegen.plugins.LinuxManPage.handler.LinuxManPageHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new LinuxManPageHandler()
        ]
    }
}
