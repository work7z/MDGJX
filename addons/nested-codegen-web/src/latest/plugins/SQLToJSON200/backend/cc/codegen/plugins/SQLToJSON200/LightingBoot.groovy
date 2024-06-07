
package cc.codegen.plugins.SQLToJSON200

import cc.codegen.plugins.SQLToJSON200.handler.SQLToJSON200Handler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SQLToJSON200Handler()
        ]
    }
}
