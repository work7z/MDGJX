
package cc.codegen.plugins.BizJSONToCode

import cc.codegen.plugins.BizJSONToCode.handler.BizJSONToCodeHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new BizJSONToCodeHandler()
        ]
    }
}
