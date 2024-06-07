package cc.codegen.plugins.specification.utils

import cc.codegen.plugins.specification.definition.ExtHandleItem

class MemFile {
    File innerFile;
    ExtHandleItem extHandleItem;

    MemFile(File innerFile, ExtHandleItem extHandleItem) {
        this.innerFile = innerFile
        this.extHandleItem = extHandleItem
    }

//    public static boolean cacheLength(){
//    }
}
