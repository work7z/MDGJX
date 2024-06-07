package cc.codegen.plugins.UnicodeConversion.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.text.UnicodeUtil
import cn.hutool.core.util.StrUtil
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class UnicodeConversionHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "encode"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        if (extHandleItem.empty) {
                            return ResFunc.noEmpty()
                        }
                        def res = UnicodeUtil.toUnicode(value, params['config_skip_ascii'] == 'true')
                        return ResFunc.ok([value: res])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "decode"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        if (extHandleItem.empty) {
                            return ResFunc.noEmpty()
                        }
                        def res = UnicodeUtil.toString(StrUtil.utf8Str(bytes_text))
                        return ResFunc.ok([value: res])
                    }
                },

        ])
    }
}
