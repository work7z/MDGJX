
package cc.codegen.plugins.XMLJSoup

import cc.codegen.plugins.XMLJSoup.handler.XMLJSoupHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new XMLJSoupHandler()
        ]
    }
}
