package cc.codegen.plugins.RedisDrafts.redis.bean

import cc.codegen.plugins.specification.definition.ExtHandleItem

class RedisConfig {
    boolean useSSL;
    String configId;
    String password;
    Integer connectTimeout;
    Integer socketTimeout;
    String host;
    Integer port;
    Integer dbIndex; // optional field
    String dbKey;
    String dbValue;
    String keyword;

    public File fn_getDirectConfigDir(ExtHandleItem ext) {
        def bb = ext.sf.getFileWithNoCheck(ext.twa.getTempDirForCurrentWorkspace(), "redis/${configId}")
        ext.sf.mkdirs(bb)
        return bb
    }

    public File fn_getConfigKeyListFile(ExtHandleItem ext, Integer dbIndex) {
        return ext.sf.getFileWithNoCheck(fn_getDirectConfigDir(ext), "keys-${dbIndex}.txt".toString())
    }

    public File fn_getConfigKeyListFileTmp(ExtHandleItem ext, Integer dbIndex) {
        return ext.sf.getFileWithNoCheck(fn_getDirectConfigDir(ext), "keys-${dbIndex}-${System.currentTimeMillis()}.txt".toString())
    }

}
