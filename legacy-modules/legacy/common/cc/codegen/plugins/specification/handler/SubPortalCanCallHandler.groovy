package cc.codegen.plugins.specification.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.definition.ExtHandleItem

class SubPortalCanCallHandler extends CodeGenPluginHandler{
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        switch (action){
            case 'list_all_ext_tabs':
                break;
        }
        return null
    }
}
