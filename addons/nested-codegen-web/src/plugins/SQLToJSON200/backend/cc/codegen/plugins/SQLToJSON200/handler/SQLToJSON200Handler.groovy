package cc.codegen.plugins.SQLToJSON200.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import com.alibaba.druid.pool.DruidDataSource
import com.alibaba.druid.sql.SQLUtils
import com.alibaba.druid.sql.ast.SQLObject
import com.alibaba.druid.sql.ast.SQLStatement
import com.alibaba.druid.sql.ast.SQLStatementImpl
import com.alibaba.druid.sql.ast.statement.SQLCreateStatement
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.serializer.SerializerFeature
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class SQLToJSON200Handler extends CodeGenPluginHandler {

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
                        DruidDataSource dataSource;
                        String DBTYPE = extHandleItem.params.DBTYPE as String
                        def sql = value as String;
                        def list = SQLUtils.parseStatements(sql, DBTYPE)
                        def finalValue = []
//                        list.each {
//                            finalValue.add([
//                                    sql   : it.toString(),
//                                    dbType: it.getDbType(),
//                                    children: formatByChildren(it.getChildren())
//                            ])
//                        }
                        finalValue = list;
                        def tval = JSON.toJSONString(
                                finalValue,
                                SerializerFeature.PrettyFormat,
                        )
                        tval = tval.split("\n").findAll({
                            return !it.contains("\$ref")
                        }).join("\n")
                        return ResFunc.ok([value: tval])
                    } else {
                        value = value.trim()
                        if (value.startsWithAny("{")) {
                            value = "[${value}]"
                        }
                        def res = JSON.parseArray(value, SQLStatementImpl.class)
                        def fin = []
                        res.each {
                            fin.push(it.toString())
                        }
                        return ResFunc.ok([value: fin.join("\n\n")])
                    }
                } catch (Throwable e) {
                    return ResFunc.ok([value: extHandleItem.twa.getErrToStr(e)])
                }
            }
        }])
    }

}
