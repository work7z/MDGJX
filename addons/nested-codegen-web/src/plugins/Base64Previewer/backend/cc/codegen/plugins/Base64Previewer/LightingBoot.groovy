
package cc.codegen.plugins.Base64Previewer

import cc.codegen.plugins.Base64Previewer.handler.Base64PreviewerHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new Base64PreviewerHandler()
        ]
    }
}
