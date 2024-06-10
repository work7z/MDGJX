
package cc.codegen.plugins.FTPTransfer

import cc.codegen.plugins.FTPTransfer.handler.FTPTransferHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new FTPTransferHandler()
        ]
    }
}
