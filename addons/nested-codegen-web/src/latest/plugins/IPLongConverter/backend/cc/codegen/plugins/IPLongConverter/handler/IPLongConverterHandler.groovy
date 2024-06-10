package cc.codegen.plugins.IPLongConverter.handler

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

class IPLongConverterHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "ipv42long"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = value.split("\n").findAll({ return it.trim().length() != 0 }).collect {
                            try {
                                it = it.trim()
                                def resVal = NetUtil.ipv4ToLong(it)
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
                        return "long2ipv4"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = value.split("\n").findAll({ return it.trim().length() != 0 }).collect {
                            try {
                                it = it.trim()
                                def resVal = NetUtil.longToIpv4(it.toLong())
                            } catch (Throwable throwable) {
                                return "Err: " + throwable.getMessage()
                            }
                        }
                        return ResFunc.ok([n: value, value: res.join("\n").toString()])
                    }
                },


        ])
    }
}
