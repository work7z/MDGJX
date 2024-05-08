package cc.codegen.plugins.specification.services

import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.utils.PUtils

class HistService {
    ExtHandleItem ext;
    String pluginId;

    HistService(ExtHandleItem extHandleItem, String pluginId) {
        this.ext = extHandleItem
        this.pluginId = pluginId;
    }

    public List<EachUserHistPayload> getAllHistConfigItems() {
        List<EachUserHistPayload> arrayList = []
        ext.with {
            def SFUtils = sfWrapper;
            def baseDirForMultipleWorkspace = twa.getBasedirForMultipleWorkspace()
            def allFiles = baseDirForMultipleWorkspace.listFiles().findAll({ ix -> ix.isDirectory() }).toList()
            allFiles.each { File eachWorkspace ->
//                eachUserHistPayload.setHistList()
                def currentUserFsSaveDir = SFUtils.getFile(eachWorkspace,"data/database/${pluginId}/fs");
                def historyTabDir = SFUtils.getFile(currentUserFsSaveDir, "hist")
                File[] subHistFilesArr = ext.sfWrapper.listFiles(historyTabDir).findAll {
                    return it.getName().endsWith(".txt")
                }.sort({ it.lastModified() * -1 })
                EachUserHistPayload eachUserHistPayload = new EachUserHistPayload()
                eachUserHistPayload.setWorkspaceId(eachWorkspace.getName())
                subHistFilesArr.each {
                    eachUserHistPayload.getHistList().add(it)
                }
                if (eachUserHistPayload.getHistList() != null && !eachUserHistPayload.getHistList().isEmpty()) {
                    arrayList.push(eachUserHistPayload)
                }
            }
        }
        return arrayList
    }


}
