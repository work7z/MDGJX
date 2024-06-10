
package cc.codegen.plugins.YamlJSONTool

import cc.codegen.plugins.YamlJSONTool.handler.YamlJSONToolHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new YamlJSONToolHandler()
        ]
    }
}
