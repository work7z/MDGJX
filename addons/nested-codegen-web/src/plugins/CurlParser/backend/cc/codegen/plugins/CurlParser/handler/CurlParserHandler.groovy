package cc.codegen.plugins.CurlParser.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import cc.codegen.plugins.specification.utils.PUtils
import cc.codegen.plugins.specification.utils.curl.core.CurlFactory
import cc.codegen.plugins.specification.utils.curl.core.CurlDefinition

class CurlParserHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "curl_to_json"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def parseResult = CurlFactory.parseFromCurl(extHandleItem.params['curl'] as String)
                        return ResFunc.ok([json_str: PUtils.toJSONWithBeautify(parseResult)])
                    }
                },
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "json_to_curl"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def jsonStr = extHandleItem.params['json'] as String
                        CurlDefinition curl = CurlFactory.parseFromJSON(jsonStr)
                        def curl_str = CurlFactory.convertFromCurlObj(curl)
                        return ResFunc.ok([curl_str: curl_str])
                    }
                }
        ])
    }

    static void main(String[] args) {

    }
}
