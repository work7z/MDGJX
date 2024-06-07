
package cc.codegen.plugins.SiteBrowser

import cc.codegen.plugins.SiteBrowser.handler.SiteBrowserHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SiteBrowserHandler()
        ]
    }
}
