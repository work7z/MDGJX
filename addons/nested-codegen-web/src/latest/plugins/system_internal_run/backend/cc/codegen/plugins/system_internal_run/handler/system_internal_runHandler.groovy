
package cc.codegen.plugins.system_internal_runHandler.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil

class system_internal_runHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        def g = DBWrapper.init(params);
        def twa = ToolWrapper.init(params)
        def sf = SFWrapper.init(params)
        def SFUtils = sf;
        def SF = sf;
        def userDir = twa.getCommonUserDir()
        def backupRootDir = twa.getBackupDir()
        def duplicateJsonFile = sf.getFile(params['val_DSLFolder'] as String, "dto/duplicate.json")
        if (isNeedInit()) {
            markInited()
        }
        def fn_gcc_callDSL = params['fn_gcc_callDSL']
        def fn_getFromRedis = params['fn_getFromRedis']
        def fn_setFromRedis = params['fn_setFromRedis']
        def fn_delFromRedis = params['fn_delFromRedis']
        def val_logDir = sf.getFile(params['val_logDir'] as String)
        def DSL_subFile = sf.getFile(userDir, "DSL")
        def DSLFolder = twa.getDSLFolder();

        def result = super.callCommonProcedures(action, params)
        if (result != null) {
            return result;
        }

        if (params['type'].toString() == 'transform') {
            try {
                def r = null;
                return ResFunc.ok([
                        value: r
                ])
            } catch (Throwable throwable) {
                throwable.printStackTrace()
                return ResFunc.ok([
                        value: throwable.getMessage()
                ])
            }
        }
        

        return ResFunc.ok([
            not_ack:1,
            type: params['type'],
            text: params['text'],
        ]);
    }

}
