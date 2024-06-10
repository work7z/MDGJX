
package cc.codegen.plugins.JSONXPath

import cc.codegen.plugins.JSONXPath.handler.JSONXPathHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new JSONXPathHandler()
        ]
    }
}
