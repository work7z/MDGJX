
package cc.codegen.plugins.MavenRepo

import cc.codegen.plugins.MavenRepo.handler.MavenRepoHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new MavenRepoHandler()
        ]
    }
}
