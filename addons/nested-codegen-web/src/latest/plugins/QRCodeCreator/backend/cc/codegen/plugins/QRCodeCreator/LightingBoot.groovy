
package cc.codegen.plugins.QRCodeCreator

import cc.codegen.plugins.QRCodeCreator.handler.QRCodeCreatorHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new QRCodeCreatorHandler()
        ]
    }
}
