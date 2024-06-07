
package cc.codegen.plugins.JDKJRE100

import cc.codegen.plugins.JDKJRE100.handler.JDKJRE100Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new JDKJRE100Handler()
        ]
    }
}
