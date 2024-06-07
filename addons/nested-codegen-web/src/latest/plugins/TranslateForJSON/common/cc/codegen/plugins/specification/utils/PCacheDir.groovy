package cc.codegen.plugins.specification.utils

import cc.codegen.plugins.specification.definition.ExtHandleItem
import cn.hutool.http.HttpUtil

import java.util.concurrent.TimeUnit

class PCacheDir {
    ExtHandleItem ext;
    File dir;

    public String putFile(String key, String value) {
        File m = getFileByKey(key)
        if (m.exists()) {
            ext.sfWrapper.del(m)
        }
        m.write(value)
        return m;
    }

    public String getFileContent(String key) {
        def key1 = getFileByKey(key)
        return ext.sfWrapper.readAsStringWithSafe(key1)
    }

    public String getFromHTTPURL(String url, Integer timeout) {
        def key = (url + timeout + "").md5()
        def val = getFileContent(key)
        if (val != null) {
            return val
        } else {
            def o = HttpUtil.get(url, timeout)
            putFile(key, o)
            return o;
        }
    }

    private File getFileByKey(String key) {
        def m = this.ext.sfWrapper.getFileWithNoCheck(this.dir, key)
        return m
    }

    def VAL_KEEP_FILES_HOURS = 2;

    public PCacheDir(ExtHandleItem ext, String keyName, int cacheLimits) {
        this.ext = ext;
        def crtTempDir = ext.twa.getTempDirForCurrentWorkspace()
        this.dir = (ext.sfWrapper.getFileWithNoCheck(crtTempDir, keyName))
        ext.sfWrapper.mkdirs(this.dir)
        def initFlag = 'pcache_' + keyName;
        synchronized (initFlag.intern()) {
            def e = ext.fn_getFromRedis(initFlag)
            def ref = this;
            if (e == null) {
                ext.fn_setFromRedis(initFlag, System.currentTimeMillis() + "")
                PUtils.highrun({
                    while (true) {
                        def a = ref.dir.listFiles()
                        if (a != null) {
                            def sort = a.sort({ it.lastModified() * -1 })
                            sort.eachWithIndex { File entry, int i ->
                                if (i >= cacheLimits || (System.currentTimeMillis() - entry.lastModified()) > TimeUnit.HOURS.toMillis(VAL_KEEP_FILES_HOURS)) {
                                    ext.sfWrapper.del(entry)
                                }
                            }
                        }
                        sleep(3000)
                    }
                })
            }
        }
    }
}
