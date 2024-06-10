package cc.codegen.plugins.IPAddrDNSQuery.handler

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

class IPAddrDNSQueryHandler extends CodeGenPluginHandler {
    @Override
    ResFunc handle(String action, Map<String, Object> params) {
        return handleValueFromTextOrFile(action, params, [
                new HandleTypeAndValue() {
                    @Override
                    String getType() {
                        return "convert"
                    }

                    @Override
                    ResFunc handle(String value, byte[] bytes_text, File file, ExtHandleItem extHandleItem) {
                        def res = value.split("\n").findAll({ return it.trim().length() != 0 }).collect {
                            try {
                                it = it.trim()
                                return NetUtil.getIpByHost(it) + ""
                            } catch (Throwable throwable) {
                                return throwable.getMessage()
                            }
                        }
                        return ResFunc.ok([n: value, value: res.join("\n")])
                    }
                },
        ]
        )
    }
}
