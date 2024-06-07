
package cc.codegen.plugins.TextRandomMock

import cc.codegen.plugins.TextRandomMock.handler.TextRandomMockHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new TextRandomMockHandler()
        ]
    }
}
