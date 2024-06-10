package cc.codegen.plugins.IPLocalPortChecker.handler

import cc.codegen.plugins.specification.CodeGenPluginHandler
import cc.codegen.plugins.specification.bo.ResFunc
import cc.codegen.plugins.specification.database.DBWrapper
import cc.codegen.plugins.specification.utils.SFWrapper
import cc.codegen.plugins.specification.utils.ToolWrapper
import cn.hutool.core.codec.BCD
import cn.hutool.core.net.NetUtil
import com.alibaba.fastjson.JSON
import org.apache.commons.lang3.StringUtils
import org.apache.coyote.http2.ByteUtil
import cc.codegen.plugins.specification.definition.ExtHandleItem
import cc.codegen.plugins.specification.definition.HandleTypeAndValue

class IPLocalPortCheckerHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [new HandleTypeAndValue() {
            @Override
            String getType() {
                return "check_available"
            }

            @Override
            ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                def res = value.split("\n").findAll({ return it.trim().length() != 0 }).collect {
                    try {
                        it = it.trim()
                        it = it.toInteger()
                        def resVal = "N/A"
                        def isValidPort = NetUtil.isValidPort(it)
                        if (!isValidPort) {
                            resVal = "Invalid_Port"
                        } else {
                            resVal = NetUtil.isUsableLocalPort(it) ? "Available(可用)" : "Occupied(已占用)"
                        }
                        return "${it}=${resVal}".toString()
                    } catch (Throwable throwable) {
                        return "Err: " + throwable.getMessage()
                    }
                }
                return ResFunc.ok([n: value, value: res.join("\n").toString()])
            }
        },
                                                          new HandleTypeAndValue() {
                                                              @Override
                                                              String getType() {
                                                                  return "listing_used"
                                                              }

                                                              @Override
                                                              ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                                                                  def res = []
                                                                  for (def i = 1; i <= 65535; i++) {
                                                                      if (!NetUtil.isUsableLocalPort(i)) {
                                                                          res.push("${i}=${"Occupied(已占用)"}".toString())
                                                                      }
                                                                  }
                                                                  return ResFunc.ok([n: value, value: res.join("\n")])
                                                              }
                                                          },

        ])
    }
}
