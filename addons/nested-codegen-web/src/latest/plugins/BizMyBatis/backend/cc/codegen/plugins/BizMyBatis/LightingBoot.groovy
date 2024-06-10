
package cc.codegen.plugins.BizMyBatis

import cc.codegen.plugins.BizMyBatis.handler.BizMyBatisHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new BizMyBatisHandler()
        ]
    }
}
