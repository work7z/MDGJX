
package cc.codegen.plugins.JSONQMapper

import cc.codegen.plugins.JSONQMapper.handler.JSONQMapperHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new JSONQMapperHandler()
        ]
    }
}
