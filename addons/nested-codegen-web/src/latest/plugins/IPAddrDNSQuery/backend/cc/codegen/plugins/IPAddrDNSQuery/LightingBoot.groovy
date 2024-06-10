
package cc.codegen.plugins.IPAddrDNSQuery

import cc.codegen.plugins.IPAddrDNSQuery.handler.IPAddrDNSQueryHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new IPAddrDNSQueryHandler()
        ]
    }
}
