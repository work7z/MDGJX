package cc.codegen.plugins.SQLDrafts

import cc.codegen.plugins.SQLDrafts.handler.SQLDraftsHandler
import cc.codegen.plugins.specification.CodeGenInitializer
import cc.codegen.plugins.specification.CodeGenPluginHandler
import sql_pass_vm.meta.SQLRequestBody

class LightingBoot extends CodeGenInitializer {
    @Override
    List<CodeGenPluginHandler> getHandlers() {
        return [
                new SQLDraftsHandler()
        ]
    }

    static void main(String[] args) {
        println "ok"
        SQLRequestBody sqlRequestBody;
        println(SQLRequestBody.class)
    }
}
