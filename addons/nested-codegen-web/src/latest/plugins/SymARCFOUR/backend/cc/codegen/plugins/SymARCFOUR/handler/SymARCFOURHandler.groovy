package cc.codegen.plugins.SymARCFOUR.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class SymARCFOURHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        params['return_error'] = true
        def en_de_api_name = "encryption_and_decryption"
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "init_key"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
                        def res = ext.callExterior(en_de_api_name, [
                                basic_key_type: params['basic_key_type'],
                                type          : 'sym_get_pri_key',
                                all_p         : params,
                        ])
                        return ResFunc.ok([value: res])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "transform"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem ext) {
                        def res = ext.callExterior(en_de_api_name, [
                                type : 'sym_transform',
                                all_p: params,
                        ])
                        return ResFunc.ok([value: res.value])
                    }
                },
        ])
    }
}
