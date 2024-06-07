package cc.codegen.plugins.TextHelperUniquer.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.collection.CollectionUtil
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class TextHelperUniquerHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "uniquer"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                def res = (bytes_text)
                def config_line_sep_char = extHandleItem.getConfigLineSepChar()
                def list = extHandleItem.getTextHelperByValue(value, extHandleItem)
                def finalValue = CollectionUtil.distinct(list)
                if (params['config_uniquer_output_type'] == 'text_with_count') {
                    finalValue = finalValue.collect { String eachValue ->
                        def countRaw = 0;
                        list.each {
                            if (it == eachValue) {
                                countRaw++
                            }
                        }
                        return [
                                countRaw, eachValue
                        ]
                    }.sort {
                        return it[0]
                    }.collect { def arr ->
                        def countRaw = arr[0]
                        def eachValue = arr[1]
                        return "[${countRaw}]\t${eachValue}"
                    }
                }
                return ResFunc.ok([value: finalValue.join(config_line_sep_char)])
            }
        }]
        )
    }
}
