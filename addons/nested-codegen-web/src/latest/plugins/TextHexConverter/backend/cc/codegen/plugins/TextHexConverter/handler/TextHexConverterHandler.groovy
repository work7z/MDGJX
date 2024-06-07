package cc.codegen.plugins.TextHexConverter.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.util.HexUtil
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

import java.nio.charset.Charset

class TextHexConverterHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "hex_encode"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def config_charset = extHandleItem.params['config_charset'] as String
                        def result_value = HexUtil.encodeHex(bytes_text, true)
                        def res = result_value
                        return ResFunc.ok([value: res])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "hex_decode"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def config_charset = extHandleItem.params['config_charset'] as String
                        def result_value = HexUtil.decodeHexStr(value, Charset.forName(config_charset))
                        def res = result_value
                        return ResFunc.ok([value: res])
                    }
                }

        ])
    }
}
