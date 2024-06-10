
package cc.codegen.plugins.CurlParser

import cc.codegen.plugins.CurlParser.handler.CurlParserHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new CurlParserHandler()
        ]
    }
}
