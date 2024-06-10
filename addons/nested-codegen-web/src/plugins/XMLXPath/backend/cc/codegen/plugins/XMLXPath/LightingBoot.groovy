
package cc.codegen.plugins.XMLXPath

import cc.codegen.plugins.XMLXPath.handler.XMLXPathHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new XMLXPathHandler()
        ]
    }
}
