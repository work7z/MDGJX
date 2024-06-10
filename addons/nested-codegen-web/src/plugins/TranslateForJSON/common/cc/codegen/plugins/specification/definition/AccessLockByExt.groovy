package cc.codegen.plugins.specification.definition

import cc.codegen.plugins.specification.utils.PUtils
import cn.hutool.core.lang.Assert

class AccessLockByExt {
    ExtHandleItem ext;
    String key;
    String lckVal;

    AccessLockByExt(ExtHandleItem ext, String key) {
        this.ext = ext
        this.key = key
        this.lckVal = PUtils.uuid()
        ext.fn_setFromRedis(this.key, this.lckVal)
    }

    void checkPoint() {
        Assert.isTrue(ext.fn_getFromRedis(key) == lckVal,"the lock is expired")
    }
}
