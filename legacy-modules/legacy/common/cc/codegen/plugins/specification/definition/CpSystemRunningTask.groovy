package cc.codegen.plugins.specification.definition

import com.alibaba.fastjson.annotation.JSONField

import java.util.concurrent.Callable

class CpSystemRunningTask {
    Integer port;
    String prop;
    String name;
    boolean external = true;
    Closeable internalRefCloseable;
    Callable internalRefCallable;
    def fn_internalRefCloseable;
    def fn_internalRefCallable;
    String description;
    @JSONField(serialize = false, deserialize = false)
    List<String> cmd = []
    @JSONField(serialize = false, deserialize = false)
    String[] env = []
    File workDir;
    @JSONField(serialize = false, deserialize = false)
    Map<String, Object> extraMaps = [:]
    Process process;
    Closure fn_user_handle_process = null;
}

