
package cc.codegen.plugins.SoftwareCenter

import cc.codegen.plugins.SoftwareCenter.handler.SoftwareCenterHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SoftwareCenterHandler()
        ]
    }
}
