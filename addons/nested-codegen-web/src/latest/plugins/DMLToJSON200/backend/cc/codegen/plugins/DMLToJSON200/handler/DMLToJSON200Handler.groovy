package cc.codegen.plugins.DMLToJSON200.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.serializer.SerializerFeature
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class DMLToJSON200Handler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "transform"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                try {
                    if (extHandleItem.params.type == 'sql_to_json') {
                        String DBTYPE = extHandleItem.params.DBTYPE as String
                        def sql = value as String;
                        def list = extHandleItem.dbWrapper.getSQLParserAsStr(sql, DBTYPE)
                        return ResFunc.ok([value:list])
                    } else {
                    }
                } catch (Throwable e) {
                    return ResFunc.ok([value: extHandleItem.twa.getErrToStr(e)])
                }
            }
        }])
    }

}
