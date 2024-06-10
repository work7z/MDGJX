package cc.codegen.plugins.Base32.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.Base32

class Base32Handler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "encode"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                def res = Base32.encode(bytes_text)
                return ResFunc.ok([value: res])
            }
        }, new HandleTypeAndValue() {
            @Override
            String getType() {
                return 'decode'
            }

            @Override
            ResFunc handle(String value, byte[] bytes_value, File uploadedFileIfHas, ExtHandleItem extHandleItem) {
                def res =new String(Base32.decode(value))
                return ResFunc.ok([value: res])
            }
        }])
    }

    static void main(String[] args) {
        def rawString = "12345ABC";
        def s2 = Base32.encode(rawString)
        println(s2)
        def s3 = new String(Base32.decode(s2))
        println(s3)
    }
}
