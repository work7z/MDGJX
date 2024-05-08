package cc.codegen.plugins.specification.services

import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.utils.PUtils

class EachUserHistPayload {
    String workspaceId;
    List<File> histList = [];

    public String getMaskedWorkspaceId() {
        return PUtils.maskStr(workspaceId)
    }

    public List<Closure<EachHistoryItem>> getHistItemListWithReadable(ExtHandleItem ext) {
        return histList.collect { File s->
            return {
                return new EachHistoryItem(ext, s)
            }
        }
    }
}
