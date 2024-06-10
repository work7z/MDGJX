package cc.codegen.plugins.FTPTransfer.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.PUtils
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class FTPTransferHandler extends CodeGenPluginHandler {
    // https://mileslin.github.io/2020/02/%E4%BD%BF%E7%94%A8-Docker-%E5%BB%BA%E7%BD%AE-FTP-SFTP-%E7%92%B0%E5%A2%83/
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [
                *["connect", 'disconnect', 'execute', 'status'].collect({
                    return new HandleTypeAndValue() {
                        @Override
                        String getType() {
                            return "ftp_opt_${it}".toString()
                        }

                        @Override
                        ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                            setAsExpiredTime(params, 30)
                            def res = ext.callExterior("net_handler", [
                                    service_type: 'ftp',
                                    action_type : ext.params.action_type, // connect, disconnect, execute
                                    *           : ext.params
                            ])
                            return ResFunc.ok([value: res])
                        }
                    }
                }),
        ])
    }
}
