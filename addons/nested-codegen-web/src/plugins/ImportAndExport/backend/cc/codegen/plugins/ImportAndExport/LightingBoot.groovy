
package cc.codegen.plugins.ImportAndExport

import cc.codegen.plugins.ImportAndExport.handler.ImportAndExportHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new ImportAndExportHandler()
        ]
    }
}
