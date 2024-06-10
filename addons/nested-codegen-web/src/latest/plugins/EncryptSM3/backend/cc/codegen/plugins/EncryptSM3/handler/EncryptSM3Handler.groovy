package cc.codegen.plugins.EncryptSM3.handler

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

class EncryptSM3Handler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        params['return_error'] = true
//        params['no_empty_string'] = true
        def en_de_api_name = "encryption_and_decryption"
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "encrypt"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        if (extHandleItem.empty) {
                            return ResFunc.noEmpty()
                        }
                        def res = extHandleItem.callExterior(en_de_api_name, [
                                g_encode_mode: params['g_encode_mode'],
                                type       : 'sm3_encrypt_by_bytes',
                                bytes_value: bytes_text,
                                pub_key    : params['config_pubkey_value'],
                                pri_key    : params['config_prikey_value']
                        ])
                        return ResFunc.ok([value: res.result])
                    }
                },

        ])
    }
}