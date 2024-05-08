package cc.codegen.plugins.specification.keys

import cc.codegen.plugins.specification.definition.ExtHandleItem

class PHolder {
    public static ThreadLocal<ExtHandleItem> EXT_HANDLE_HOLDER = new InheritableThreadLocal<>()

    public static ExtHandleItem getExt() {
        def obj = EXT_HANDLE_HOLDER.get()
        if (obj == null) {
            throw new MisConfigException("Ext is empty, out of scope.")
        } else {
            return obj;
        }
    }
}
