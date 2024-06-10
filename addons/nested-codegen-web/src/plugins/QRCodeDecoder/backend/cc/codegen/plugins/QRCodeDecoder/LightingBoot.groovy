
package cc.codegen.plugins.QRCodeDecoder

import cc.codegen.plugins.QRCodeDecoder.handler.QRCodeDecoderHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new QRCodeDecoderHandler()
        ]
    }
}
