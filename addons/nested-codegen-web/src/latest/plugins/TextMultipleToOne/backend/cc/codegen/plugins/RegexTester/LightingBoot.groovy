
package cc.codegen.plugins.RegexTester

import cc.codegen.plugins.RegexTester.handler.RegexTesterHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new RegexTesterHandler()
        ]
    }
}
