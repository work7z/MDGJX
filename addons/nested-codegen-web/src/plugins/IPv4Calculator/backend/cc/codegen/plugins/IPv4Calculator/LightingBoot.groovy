
package cc.codegen.plugins.IPv4Calculator

import cc.codegen.plugins.IPv4Calculator.handler.IPv4CalculatorHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new IPv4CalculatorHandler()
        ]
    }
}
