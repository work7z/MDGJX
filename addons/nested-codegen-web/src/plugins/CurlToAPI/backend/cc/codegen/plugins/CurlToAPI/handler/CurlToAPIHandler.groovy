package cc.codegen.plugins.CurlToAPI.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.PUtils
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cc.codegen.plugins.specification.utils.curl.core.CurlDefinition
import cc.codegen.plugins.specification.utils.curl.core.CurlFactory
import cn.hutool.core.codec.BCD
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class CurlToAPIHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "curl_to_api"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def parseResult = CurlFactory.parseFromCurl(extHandleItem.params['curl'] as String)
                        return ResFunc.ok([result: PUtils.toJSONWithBeautify(parseResult)])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "json_to_api"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def jsonStr = extHandleItem.params['json'] as String
                        CurlDefinition curl = CurlFactory.parseFromJSON(jsonStr)
                        return ResFunc.ok([result: JSON.toJSONString(curl)])
                    }
                }
        ])
    }
}
