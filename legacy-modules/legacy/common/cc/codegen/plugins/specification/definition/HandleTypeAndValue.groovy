package cc.codegen.plugins.specification.definition

import cc.codegen.plugins.specification.bo.ResFunc

abstract class HandleTypeAndValue {
    public abstract String getType();

    public abstract ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext);
}
