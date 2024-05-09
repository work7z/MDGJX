package cc.codegen.plugins.specification.wrapper

import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cc.codegen.plugins.specification.wrapper.vm.ServiceRunnable
import cn.hutool.core.thread.ThreadUtil

class ServiceRedisTaskWrapper {
    ExtHandleItem extHandleItem;
    ServiceRunnable serviceRunnable;
    boolean stopBeforeRun;

    ServiceRedisTaskWrapper(ExtHandleItem extHandleItem, ServiceRunnable serviceRunnable, boolean stopBeforeRun) {
        this.extHandleItem = extHandleItem
        this.serviceRunnable = serviceRunnable
        this.stopBeforeRun = stopBeforeRun
    }

    public static final String key_service_res = "service_res_"

    public static String getServiceResId_static_method(def key) {
        return key_service_res + key
    }

    public static String getServiceStatus_static_method(def key) {
        return "service_status_" + key
    }

    public void startAsync() {
        ThreadUtil.execAsync(new Runnable() {
            @Override
            void run() {
                def params = extHandleItem.params
                def g = DBWrapper.init(params);
                def twa = ToolWrapper.init(params)
                def sf = SFWrapper.init(params)
                def SFUtils = sf;
                def GUtils = twa;
                def SF = sf;
                def userDir = twa.getCommonUserDir()
                def fn_getFromRedis = params['fn_getFromRedis']
                def fn_setFromRedis = params['fn_setFromRedis']
                def fn_delFromRedis = params['fn_delFromRedis']
                def res_id = getServiceResId_static_method(serviceRunnable.getKey())
                def status_id = getServiceStatus_static_method(serviceRunnable.getKey())
                def pre_body = fn_getFromRedis(res_id)
                if (pre_body != null) {
                    pre_body.stop()
                }
                fn_setFromRedis(status_id, serviceRunnable.status)
                def res = serviceRunnable.runAndReturnQuickly()
                fn_setFromRedis(res_id, res)
            }

        })
    }
}
