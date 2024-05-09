package cc.codegen.plugins.specification.services

import cc.codegen.plugins.specification.definition.ExtHandleItem

class EachHistoryItem {
    ExtHandleItem ext;
    HistObj histObj
    boolean notEmpty;

    EachHistoryItem(ExtHandleItem ext, File file) {
        this.ext = ext
        this.notEmpty = ext.sfWrapper.validJSON(file);
        if (this.notEmpty) {
            this.histObj = ext.twa.parse(file.getText("UTF-8"), HistObj.class)
        }
    }

    public <T> T formatSnapJSON(Class<T> clz) {
        this.histObj.with {
            if (notEmpty) {
                return ext.twa.parse(this.histObj.getSNAPSHOT_JSON(), clz)
            } else {
                return null;
            }
        }
    }
}
