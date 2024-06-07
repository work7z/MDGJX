
package cc.codegen.plugins.JWTDecoder

import cc.codegen.plugins.JWTDecoder.handler.JWTDecoderHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new JWTDecoderHandler()
        ]
    }
}
