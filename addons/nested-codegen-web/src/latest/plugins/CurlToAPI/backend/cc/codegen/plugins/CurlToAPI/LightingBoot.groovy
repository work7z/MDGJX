
package cc.codegen.plugins.CurlToAPI

import cc.codegen.plugins.CurlToAPI.handler.CurlToAPIHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new CurlToAPIHandler()
        ]
    }
}
