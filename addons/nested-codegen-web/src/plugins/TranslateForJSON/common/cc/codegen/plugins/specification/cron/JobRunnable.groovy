package cc.codegen.plugins.specification.cron

import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.exp.JobClosedException

import java.util.concurrent.Callable
import java.util.logging.Logger

abstract class JobRunnable implements Callable, Closeable {
    ExtHandleItem extHandleItem;
    String uid

    JobRunnable(ExtHandleItem extHandleItem) {
        this.extHandleItem = extHandleItem;
        this.uid = extHandleItem.twa.uuid();
        def extId = extHandleItem.getExtId()
        this.extHandleItem.fn_setFromRedis(this.getExtIdWrapperId(extId), uid)
    }

    public abstract void whenClosed();

    private String getExtIdWrapperId(extId) {
        return "job_${extId}"
    }

    public void checkPoint() throws JobClosedException {
        if (isClosed()) {
            this.whenClosed()
            throw new JobClosedException()
        }
    }

    def ranTaskLogicFunc

    public void bindInst(def ranTaskLogicFunc) {
        this.ranTaskLogicFunc = ranTaskLogicFunc
    }

    public Logger getErrLogRef() {
        return ranTaskLogicFunc.getErrLogRef()
    }

    public Logger getOutLogRef() {
        return ranTaskLogicFunc.getOutLogRef()
    }

    public Map getConfigFileAsMap() {
        return ranTaskLogicFunc.getConfigFileAsMap()
    }

    public modifyJSONIfHas(File file, Closure closure) {
        ranTaskLogicFunc.modifyJSONIfHas(file, closure)
    }

    public abstract void handleException(Throwable e);

    public static final String FLAG_QUIT = "QUIT";

    @Override
    void close() throws IOException {
        def extId = extHandleItem.getExtId()
        this.extHandleItem.fn_setFromRedis(this.getExtIdWrapperId(extId), FLAG_QUIT)
    }

    boolean isClosed() {
        return this.extHandleItem.fn_getFromRedis(this.getExtIdWrapperId(extHandleItem.getExtId())) != uid
    }
}
