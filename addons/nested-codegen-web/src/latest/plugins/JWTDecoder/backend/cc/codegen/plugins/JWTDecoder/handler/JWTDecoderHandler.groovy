package cc.codegen.plugins.JWTDecoder.handler

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

class JWTDecoderHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        def en_de_api_name = "jwt_token";
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "decode_jwt_token"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                        def res = ext.callExterior(en_de_api_name, [type: 'decode', token: value])
                        return ResFunc.ok([value: res.result])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "get_algorithm_listings"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem ext) {
                        def res = getAlgListings().collect{
                            return [
                                    *:it,
                                    label: it['name'],
                                    value: it['fn'],
                            ]
                        }
                        return ResFunc.ok([value: res])
                    }
                }
        ])
    }
}
