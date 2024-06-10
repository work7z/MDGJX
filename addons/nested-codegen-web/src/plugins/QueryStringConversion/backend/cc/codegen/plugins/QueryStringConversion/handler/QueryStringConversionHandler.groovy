package cc.codegen.plugins.QueryStringConversion.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.util.URLUtil
import cn.hutool.extra.servlet.ServletUtil
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue
import org.apache.http.client.utils.URLEncodedUtils

import java.nio.charset.Charset

class QueryStringConversionHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "transform"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                if (value == null) {
                    value = ''
                }
                def res = value.split("\n").findAll({ it.trim().length() != 0 }).collect {
                    it = it.trim()
                    def protocolType = "N/A"
                    def baseHost = "0.0.0.0"
                    def urlPath = "/"
                    def jsonParam = [:]
                    def jsonParam_arr = "[]"
                    def listingTables = []
                    String subQueryParam = ""
                    if (it.startsWith("http")) {
                        protocolType = it.startsWith("https://") ? "https" : it.startsWith("https://") ? "http" : "Unknown"
                        urlPath = URLUtil.getPath(it)
                        try {
                            baseHost = URLUtil.url(it).getHost()
                        } catch (Throwable throwable) {
                            throwable.printStackTrace()
                        }
                        if (it.contains("?")) {
                            subQueryParam = it.substring(it.indexOf("?"))
                        }
                    } else {
                        if (!it.startsWith("?")) {
                            it = "?" + it
                        }
                        subQueryParam = it
                    }
                    if (subQueryParam != '') {
                        if (subQueryParam.startsWith("?") && subQueryParam.length() != 1) {
                            subQueryParam = subQueryParam.substring(1)
                        }
                        def namePairKeyCompare = URLEncodedUtils.parse(subQueryParam, Charset.forName("UTF-8"))
                        jsonParam_arr = JSON.toJSONString(namePairKeyCompare)
                        namePairKeyCompare.each {
                            jsonParam[it.getName()] = it.getValue()
                        }
                        listingTables = namePairKeyCompare.collect {
                            return "${it.getName()}=${it.getValue()}"
                        }
                    }
                    return ("# ${it}  \n" + [
                            "------------------",
                            "+ Procotol: ${protocolType}  ",
                            "+ Domain Name: ${baseHost}  ",
                            "+ URL Path: ${urlPath} ",
                            "+ Array JSON: ${jsonParam_arr} ",
                            "+ KeyValue JSON: ${JSON.toJSONString(jsonParam)} ",
                            "------------------",
                            *listingTables,
                    ].collect({ itx -> "\t${itx}" }).join("\n"))
                }.join("\n\n")
                return ResFunc.ok([value: res])
            }
        }])
    }
}
